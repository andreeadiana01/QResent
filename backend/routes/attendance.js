const express = require('express');
const Attendance = require('../models/Attendance');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { parse } = require('json2csv');
const { getLogger } = require("nodemailer/lib/shared");

const router = express.Router();

router.get('/:classId', (req, res) => {
    const { classId } = req.params;

    Attendance.find({ class: classId }, 'date')
        .then(attendants => res.json(attendants))
        .catch(() => res.status(404).json('No entries found!'));
});

router.get('/:classId/:date', (req, res) => {
    const { classId, date } = req.params;
    const currentTime = date * 1000;
    const threeHoursFutureTime = currentTime + 3 * 60 * 60 * 1000;

    Attendance.find({ class: classId, date: {$gt: currentTime, $lt: threeHoursFutureTime} })
        .then(attendants => res.json(attendants))
        .catch(() => res.status(404).json('No entries found!'));
});

router.post('/export', ((req, res) => {
    const { classId, courseId } = req.body;

    const fields = [
        {
            value: 'student',
            label: 'Student ID'
        },
        {
            value: 'course',
            label: 'Course'
        },
        {
            value: 'date',
            label: 'Date'
        },
        {
            value: 'class',
            label: 'Class'
        }
    ]

    Attendance.find({ class: classId, course: courseId })
        .then(attendants => {
            const students = attendants.map(attendant => attendant.student);
            const classes = attendants.map(attendant => attendant.class);
            let mergedAttendance;

            User.find({ _id: { $in: students } })
                .then(students => {
                    mergedAttendance = attendants.map((item, i) => Object)
                })

            const csv = parse(attendants, { fields: fields });
            res.attachment('data.csv');
            res.end(csv);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json('No entries found!')
        });
}))

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

            Attendance.create({
                date: attendanceData.date,
                course: attendanceData.courseId,
                class: attendanceData.classID,
                student: userData.id
            })
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