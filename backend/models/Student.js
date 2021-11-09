const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
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
});

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;