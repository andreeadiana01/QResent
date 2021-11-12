const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const validator = require('email-validator');
const Student = require('../models/Student');

require('dotenv').config({ path: __dirname + '/../.env' });

const mailgunDomain = 'mailgun.re-chord.live';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: mailgunDomain });

/**
 * Generate a jwt token and attach it to a cookie, along with other user data; send the cookie to the client
 */
const addToken = (user, res) => {
    jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
        if (err) {
            res.status(404).json(err);
        }

        res.cookie('t', token);

        return res.json({
            user: {
                _id: user._id,
                email: user.email,
            },
            token,
        });
    });
};

/**
 * Hash password and save it to the student document; send user data as response to the client
 */
const hashPassword = (student, password, res) => {
    bcrypt.hash(password, 10)
        .then(hash => {
            student.password = hash;
            student.save().then(updatedUser => addToken(updatedUser, res))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(500).json({ message: err }));
};

/**
 * Generate a token by encrypting the user email, then build and send an activation email
 */
const sendActivationEmail = (student, res) => {
    const token = jwt.sign({ email: student.email }, process.env.EMAIL_VALIDATION_KEY);
    const data = {
        from: 'QResent <noreply@qresent.org>',
        to: student.email,
        subject: 'Activate Your QResent Account',
        html: `
            <h3>Please click on the following link to activate your QResent account:</h3>
            <a href="${process.env.CLIENT_URL}/activate/${token}">activate account</a>
        `,
    };

    student.activationToken = token;
    student.save()
        .then(() => {
            mg.messages().send(data)
                .then(() => res.json('An activation link has been sent to your email address!'))
                .catch(() => {
                    Student.deleteOne({ email: student.email })
                        .then(() => res.status(400).json('Email address is invalid!'))
                        .catch(err => {
                            Student.deleteOne({ email: student.email })
                                .then(() => res.status(500).json('Email address is invalid!'));
                        });
                });
        });
};

const passwordValidator = (password) => {
    const regex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|' +
        '((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    return (regex.test(password));
};

const emailValidator = (email) => {
    return validator.validate(email);
};

const nameValidator = (fullName) => {
    const regex = new RegExp('^[a-zA-Z -]{3,30}$');
    return regex.test(fullName);
};

const credentialsValidator = ({ email, firstName, lastName, password }) => {
    if (!emailValidator(email)) {
        throw new Error('Invalid email!');
    }

    if (!passwordValidator(password)) {
        throw new Error('The password must be at least 6 characters long and contain a combination of letters, ' +
            'numbers and special characters!');
    }

    if (!nameValidator(firstName) || !nameValidator(lastName)) {
        throw new Error('The name should only contain letters, spaces and dashes.');
    }
};

module.exports = { sendActivationEmail, hashPassword, credentialsValidator, emailValidator, addToken };