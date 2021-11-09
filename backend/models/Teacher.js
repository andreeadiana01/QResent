const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    classes: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Class',
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetToken: {
        type: String,
        default: '',
    },
    activationToken: {
        type: String,
        default: '',
    },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
