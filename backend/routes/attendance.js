const express = require('express');
const Attendance = require('../models/Attendance');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get('/:classId', (req, res) => {
    const { date } = new Date(req.body.date);

    Attendance.find({ class: res.params.classId, date: { $gt: date, $lt: date + 1 } })
        .then(attendance => res.json(attendance))
        .catch(() => res.status(404).json('No entry found!'));
});

router.post('/', (req, res) => {
    const { jwtToken, attendanceToken } = req.body;
    let attendanceData, userData;

    try {
        attendanceData = jwt.verify(attendanceToken, process.env.JWT_KEY);
        userData = jwt.verify(jwtToken, process.env.JWT_KEY);
    } catch (err) {
        return res.status(500).json('Token expired');
    }

    User.findById(userData.id)
        .then(user => {
            if (user.role !== 'STUDENT') {
                return res.status(400).json('User is not student!');
            }

            Attendance.create({ date: attendanceData.date, class: attendanceData.classID, student: userData.id })
                .then(() => res.json('Class attended!'))
                .catch(() => res.status(404).json('Could not add student to the attendance list'));
        })
        .catch(() => res.status(404).json('Student not found!'));
});

router.get('/:classId/:studentId', (req, res) => {
    const { classId, studentId } = req.params;

    Attendance.find({ class: classId, student: studentId })
        .then(attendance => res.json(attendance))
        .catch(() => res.status(404).json('No entry found!'));
});

module.exports = router;