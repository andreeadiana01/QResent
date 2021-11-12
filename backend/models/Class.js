const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    alias: {
        type: String,
        require: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        require: true,
    },
    grading: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grading',
        default: '',
    },
    attendanceToken: {
        type: String,
        default: '',
    },
    attendanceList: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Attendance',
        default: [],
    },
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;