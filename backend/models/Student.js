const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
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
        default: '12345',
        required: true,
    },
    classes: {
        type: [{
            classes: mongoose.Schema.Types.ObjectId,
            totalGrade: Number
        }],
        ref: 'Class',
        default: [],
    },
    resetToken: {
        type: String,
        default: '',
    },
    activationToken: {
        type: String,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;