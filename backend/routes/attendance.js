const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.get('/', (req, res) => {
    Attendance.find({})
        .then(attendance => {
            console.log(attendance);
            res.json(attendance);
        });
})

module.exports = router;