const express = require('express');
const User = require("../models/User");
const { hashPassword, addToken, emailValidator } = require("../utils/auth");

const router = express.Router();

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

module.exports = router;