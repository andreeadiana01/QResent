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

router.post('/', (req, res) => {
    const { name, alias, teacher} = req.body;

    const myClass = new Class({ name, alias, teacher });

    myClass.save()
        .then(() => res.status(200).send('Class added!'))
        .catch(err => res.status(400).json(err));
});


module.exports = router;