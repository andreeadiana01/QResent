const express = require('express');
const Student = require('../models/Student');

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
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const newStudent = new Student({email, firstName, lastName, password});

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;