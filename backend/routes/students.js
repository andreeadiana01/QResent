const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sendActivationEmail, hashPassword, credentialsValidator, emailValidator, addToken } = require('../utils/auth');

const router = express.Router();

router.get('/', (req, res) => {
    User.find({role: 'STUDENT'})
        .select('-password')
        .then(students => res.json(students))
        .catch(err => res.status(404).json(err));
})

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .select('-password')
        .then(student => res.json(student))
        .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const student = new User({ email, firstName, lastName, password });

    try {
        emailValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    student.save()
        .then(() => sendActivationEmail(student, res))
        .catch(err => res.status(400).json(err));
});





module.exports = router;