const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { sendActivationEmail, hashPassword } = require('../utils/auth');

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

router.post('/add', (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const newStudent = new Student({ email, firstName, lastName, password });

    newStudent.save()
        .then(() => sendActivationEmail(newStudent, res))
        .catch(err => res.status(400).json(err));
});

router.post('/activate', (req, res) => {
    const { activationToken, password } = req.body;

    if (!activationToken) {
        return res.status(403).json('You are not authorized to activate this account!');
    }

    jwt.verify(activationToken, process.env.EMAIL_VALIDATION_KEY, (err) => {
        if (err) {
            return res.status(401).json('The activation token is invalid or has expired!');
        }

        Student.findOne({ activationToken })
            .then(student => {
                if (!student) {
                    return res.status(400).json('This account is active or the token is invalid!');
                }

                student.activationToken = '';
                student.isActive = true;
                hashPassword(student, password, res);
            });
    });
});

module.exports = router;