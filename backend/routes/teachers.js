const express = require('express');
const Teacher = require('../models/Teacher');

const router = express.Router();

router.get('/', (req, res) => {
    Teacher.find({})
        .then(teachers => {
            console.log(teachers);
            res.json(teachers);
        });
})

module.exports = router;