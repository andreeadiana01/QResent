const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        require: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        require: true,
    },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;