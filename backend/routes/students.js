const express = require('express');
const Student = require('../models/Student');
const { sendActivationEmail } = require('../utils/auth');

const router = express.Router();

router.get('/', (req, res) => {
    Student.find({})
        .then(students => {
            console.log(students);
            res.json(students);
        });
})

router.get("/:id", (req, res) => {
    try {
        res.status(200).send(db.getFromDbById(req.params.id));
    } catch (e) {
        res.status(400).send("Bad request!");
        res.status(404).send("Not found!");
    }
});

router.post('/add', (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const newStudent = new Student({ email, firstName, lastName, password });

    newStudent.save()
        .then(() => sendActivationEmail(newStudent, res))
        .catch(err => res.status(400).json(err));
})

module.exports = router;