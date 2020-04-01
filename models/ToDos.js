const mongoose = require("mongoose");

const toDosSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ToDo", toDosSchema, 'todos');