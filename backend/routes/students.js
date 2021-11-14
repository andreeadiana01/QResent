const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/User');
const bcrypt = require('bcrypt');
const { sendActivationEmail, hashPassword, credentialsValidator, emailValidator, addToken } = require('../utils/auth');

const router = express.Router();

router.get('/', (req, res) => {
    Student.find({})
        .select('-password')
        .then(students => res.json(students))
        .catch(err => res.status(404).json(err));
})

router.get("/:id", (req, res) => {
    Student.findById(req.params.id)
        .select('-password')
        .then(student => res.json(student))
        .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const student = new Student({ email, firstName, lastName, password });

    try {
        credentialsValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    student.save()
        .then(() => hashPassword(student, password, res, () => sendActivationEmail(student, res)))
        .catch(err => res.status(400).json(err));
});





module.exports = router;