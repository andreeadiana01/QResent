const express = require('express');
const User = require("../models/User");
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

module.exports = router;