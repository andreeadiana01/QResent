const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const getAttendants = (req) => {
    const { classId, date } = req.params;
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    return Attendance.aggregate([
        {
            $match:
                {
                    class: mongoose.Types.ObjectId(classId),
                    date:
                        {
                            $gte: startOfDay.getTime(),
                            $lte: endOfDay.getTime()
                        }
                }
        },
        {
            $lookup:
                {
                    from: 'users',
                    localField: 'student',
                    foreignField: '_id',
                    as: 'student_details'
                }
        },
        {
            $lookup:
                {
                    from: 'classes',
                    localField: 'class',
                    foreignField: '_id',
                    as: 'class_details'
                }
        },
        {
            $unwind: '$class_details'
        },
        {
            $unwind: '$student_details'
        },
        {
            $project:
                {
                    '_id': 0,
                    'studentName': '$student_details.fullName',
                    'studentId': '$student_details._id',
                    'department': '$student_details.department',
                    'year': '$student_details.year',
                    'grade': '$student_details.grade',
                    'className': '$class_details.name',
                    'attempt': 1,
                    'attendanceDate':
                        {
                            $toDate: '$date'
                        }
                }
        }
    ]);
};

const getStartAndEndOfDay = (date) => {
    const startOfDay = new Date(parseInt(date));
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay.getTime());
    endOfDay.setUTCHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
};

const generateAttendanceToken = (attendance, res) => {
    const token = jwt.sign(attendance, process.env.JWT_KEY, { expiresIn: 45 });
    return res.json(`${process.env.CLIENT_URL}/attend/${token}`);
};

module.exports = { getAttendants, generateAttendanceToken, getStartAndEndOfDay };