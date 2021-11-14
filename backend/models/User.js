const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const UserSchema = new mongoose.Schema({
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
        default: process.env.DEFAULT_PASSWORD,
        required: true,
    },
    role: {
        type: [String],
        enum: ['STUDENT', 'TEACHER', 'ADMIN'],
        default: 'STUDENT',
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