const express = require('express');
const Attendance = require('../models/Attendance');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { parse } = require('json2csv');
const { getAttendants, getStartAndEndOfDay } = require('../utils/attendance');

const router = express.Router();

router.get('/:classId/:date', (req, res) => {
    getAttendants(req)
        .then(attendants => res.json(attendants))
        .catch(() => res.status(404).json('No entry found!'));
});

router.get('/:classId/:date/statistics', (req, res) => {
    const { classId, date } = req.params;
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    Attendance.find({
        class: classId,
        date:
            {
                $gte: startOfDay.getTime(),
                $lte: endOfDay.getTime()
            }
    })
        .distinct('student')
        .then(result => res.send(result.length));
});

router.get('/:classId/:date/attempt', (req, res) => {
    const { classId, date } = req.params;
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    Attendance.find({
        class: classId,
        date:
            {
                $gte: startOfDay.getTime(),
                $lte: endOfDay.getTime()
            }
    }, {
        'attempt': 1,
        '_id': 0
    })
        .then(result => {
            if (!result.length) {
                return res.json(1);
            }

            const attempts = result.map(item => item.attempt);
            res.json(Math.max(...attempts) + 1);
        })
        .catch(() => res.status(404).json('No entries found!'));
});

router.get('/:classId/:date/export', ((req, res) => {
    const fields = [
        {
            value: 'attempt',
            label: 'Attempt'
        },
        {
            value: 'studentName',
            label: 'Student Name'
        },
        {
            value: 'studentId',
            label: 'Student ID'
        },
        {
            value: 'department',
            label: 'Department'
        },
        {
            value: 'year',
            label: 'Year'
        },
        {
            value: 'grade',
            label: 'Grade'
        },
        {
            value: 'attendanceDate',
            label: 'Date'
        },
        {
            value: 'className',
            label: 'Class'
        }
    ];

    getAttendants(req)
        .then(attendants => {
            const csv = parse(attendants, { fields: fields });
            res.send(csv);
        })
        .catch(err => res.status(500).json(err));
}));

router.get('/:classId/statistics', (req, res) => {
    const { classId } = req.params;

    Attendance.find({ class: classId })
        .distinct('student')
        .then(result => res.send(result.length));
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

            Attendance.create({
                date: attendanceData.date,
                class: attendanceData.classId,
                attempt: attendanceData.attempt,
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