const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLass',
        require: true,
    },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;