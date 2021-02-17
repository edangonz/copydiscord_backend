const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 8,
    },
    password: {
        type: String,
        required: true,
        minlength: 60,
        maxlength: 60,
    },
    _id_configuration: {
        type: String,
        required: true,
    },
    _id_friends: {
        type: String,
        required: true,
    },
    lastlogin: {
        type: Date,
        require: false
    }
});

module.exports = mongoose.model('user', userSchema);