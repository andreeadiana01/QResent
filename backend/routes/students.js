const express = require('express');
const User = require('../models/User');
const { sendActivationEmail, emailValidator } = require('../utils/auth');
const Class = require("../models/Class");

const router = express.Router();

router.get('/', (req, res) => {
    User.find({ role: 'STUDENT' })
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
    const { email, firstName, lastName, department, year, grade, isActive } = req.body;
    const fullName = `${lastName} ${firstName}`;

    const student = new User({ email, fullName, department, year, grade, isActive });

    try {
        emailValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    student.save()
        .then(() => res.send('ok'))
        // .then(() => sendActivationEmail(student, res))
        .catch(err => res.status(400).json(err));
});

router.post('/:id/classes', (req, res) => {
    const { classId } = req.body;

    User.updateOne({ _id: req.params.id, 'classes': { $not: { $elemMatch: { classes: classId } } } }, {
        $push: {
            classes: {
                classes: classId,
                totalGrade: 0
            }
        }
    })
        .then(() => res.json('Success'));
})

router.get('/:id/classes', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user.role !== 'STUDENT') {
                return res.status(400).json('User is not a student');
            }

            const classes = user.classes.map(currentClass => currentClass.classes);

            Class.find({ _id: { $in: classes } })
                .then(classes => res.json(classes))
                .catch(err => res.status(500).json(err));
        })
        .catch(() => res.status(404).json('User not found'));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted!'))
        .catch(() => res.status(404).json('Student not found!'));
});

module.exports = router;