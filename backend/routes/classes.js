const express = require('express');
const Class = require('../models/Class');

const router = express.Router();

router.get('/', (req, res) => {
    Class.find({})
        .then(classes => {
            console.log(classes);
            res.json(classes);
        });
})

module.exports = router;