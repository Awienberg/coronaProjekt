const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.getFullName = function() {
    return `Name: ${this.firstName} ${this.lastName}`;
};

userSchema.methods.getInfo = function() {
    return `${this.getFullName()}, userID: ${this.userID}, Zipcode: ${this.zipcode}`;
};

userSchema.methods.getCredentials = function() {
    return `${this.userID}\t${this.password}`;
};

module.exports = mongoose.model('User', userSchema, 'user');
