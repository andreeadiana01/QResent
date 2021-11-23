const express = require('express');
const Class = require('../models/Class');
const User = require("../models/User");

const router = express.Router();

router.get('/', (req, res) => {
    Class.find({})
        .then(classes => res.json(classes));
});

router.post('/', (req, res) => {
    const { name, alias, teacherId } = req.body;

    const myClass = new Class({ name, alias, teacherId });

    myClass.save()
        .then(() => {
            const query = { _id: teacherId, 'role': 'TEACHER' };
            const update = { $push: { classes: myClass } };

            User.updateOne(query, update)
                .then(() => res.status(200).json('Class added!'))
                .catch(() => res.status(500).json('Couldn\'t add class'));
        })
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    Class.findById(req.params.id)
        .then(myclass => res.json(myclass))
        .catch(err => res.status(404).json(err));
});

router.get('/:classId/students', (req, res) => {
    const classId = req.params.classId;
    const query = {
        $and: [
            { 'classes': { $elemMatch: { classes: classId } } },
            { 'role': 'STUDENT' }
        ]
    }

    User.find(query)
        .then(user => res.json(user))
        .catch((err) => res.status(404).json(err));
});

router.get('/:classId/studentsNotEnrolled', (req, res) => {
    const classId = req.params.classId;
    const query = {
        $and: [
            { 'classes': { $not: { $elemMatch: { classes: classId } } } },
            { 'role': 'STUDENT' }
        ]
    }

    User.find(query)
        .then(user => res.json(user))
        .catch((err) => res.status(404).json(err));
});

router.post('/:classId/students', (req, res) => {
    const { students } = req.body;
    const classId = req.params.classId;

    const query = {
        $and: [
            { '_id': { $in: students } },
            { 'classes': { $not: { $elemMatch: { classes: classId } } } }
        ]
    }

    User.updateMany(query, { $push: { classes: { classes: classId, totalGrade: 0 } } })
        .then(() => res.json('Students enrolled successfully!'))
        .catch(() => res.status(404).json('Students not found!'));
});

router.delete('/:classId/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const classId = req.params.classId;

    User.findByIdAndUpdate(studentId, { $pull: { classes:  { classes: classId }  } })
        .then(() => res.json('Student unenrolled!'))
        .catch(() => res.status(404).json('Student not found!'));
});

// router.get("/:teacherId/classes", (req, res) => {
//     Class.find({teacher : req.params.teacherId})
//         .then(classes => res.json(classes))
//         .catch(err => res.status(404).json(err));
// });


module.exports = router;