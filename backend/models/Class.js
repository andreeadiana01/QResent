const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    alias: {
        type: String,
        require: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    grading: {
        type: [{
            criteria: {
                type: String,
                require: true
            },
            points: {
                type: Number,
                require: true
            }
        }]
    },
    schedule: {
        type: {
            day: String,
            time: String,
        }
    }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;