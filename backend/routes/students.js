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

router.post('/', (req, res) => {

})

module.exports = router;