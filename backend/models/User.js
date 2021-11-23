const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
    },
    year: {
        type: String,
        enum: ['Licenta-1', 'Licenta-2', 'Licenta-3', 'Licenta-4', 'Master-1', 'Master-2'],
    },
    department: {
        type: String,
        enum: ['CTI-ACS', 'IS-ACS'],
    },
    password: {
        type: String,
        default: process.env.DEFAULT_PASSWORD,
        required: true,
    },
    role: {
        type: String,
        enum: ['STUDENT', 'TEACHER'],
        default: 'STUDENT',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    classes: {
        type: [{
            classes: mongoose.Schema.Types.ObjectId,
            totalGrade: Number
        }],
        ref: 'Class',
        default: [],
        id: false,
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

const User = mongoose.model('User', UserSchema);

module.exports = User;