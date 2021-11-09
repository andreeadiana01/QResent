const mongoose = require('mongoose');

const GradingSchema = mongoose.Schema({
    criteria: {
        type: String,
        require: true,
    },
    percent: {
        type: Number,
        require: true,
    },
});

module.exports = GradingSchema;