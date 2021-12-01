const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const classesRouter = require('./routes/classes');
const authRouter = require('./routes/auth');
const studentsRouter = require('./routes/students');
const teachersRouter = require('./routes/teachers');
const attendanceRouter = require('./routes/attendance');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/* Open connection to Mongo Atlas */
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB database connection established successfully!'))
    .catch(err => console.log(err));

app.use('/api/students', studentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/attendance', attendanceRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));