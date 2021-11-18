const express = require('express');
const User = require("../models/User");
const Class = require("../models/Class");
const { hashPassword, addToken, emailValidator } = require("../utils/auth");

const router = express.Router();

router.get('/', (req, res) => {
    User.find({role: 'TEACHER'})
        .select('-password')
        .then(teachers => res.json(teachers))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const { email, firstName, lastName, password, isAdmin } = req.body;

    const teacher = new User({ email, firstName, lastName, password, isAdmin, role: 'TEACHER', isActive: true});

    try {
        emailValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    teacher.save()
        .then(() => hashPassword(teacher, password, res, () => addToken(teacher, res)))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .select('-password')
        .then(teacher => res.json(teacher))
        .catch(err => res.status(404).json(err));
});

router.get("/:id/classes", (req, res) => {
    Class.find({teacher : req.params.id})
        .then(classes => res.json(classes))
        .catch(err => res.status(404).json(err));
});

// router.put("/:id", (req, res) => {
//     const teacher = new User(req.body);

//     teacher.update()
//         .then(() => res.status(204).json('Class assigned!'))
//         .catch(err => res.status(400).json(err));
// });

module.exports = router;