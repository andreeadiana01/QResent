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
    const { name, alias, teacher, grading, attendanceToken, attendanceList} = req.body;

    const myClass = new Class({ name, alias, teacher, grading, attendanceToken, attendanceList});

    myClass.save()
        .then(() => res.status(200).json('Class added!'))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Class.findById(req.params.id)
        .then(myclass => res.json(myclass))
        .catch(err => res.status(404).json(err));
});

// router.get("/:teacherId/classes", (req, res) => {
//     Class.find({teacher : req.params.teacherId})
//         .then(classes => res.json(classes))
//         .catch(err => res.status(404).json(err));
// });


module.exports = router;