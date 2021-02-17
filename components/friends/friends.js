const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    friends : {
        type: Array,
        required: true,
        default: []
    },
    request: {
        type: Array,
        required: true,
        default: []
    },
    pending: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('friends', mySchema);