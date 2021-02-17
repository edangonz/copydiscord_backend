const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    state_user: {
        type: String,
        required: true,
        default: 'conected'
    },
    language: {
        type: String,
        required: true,
        default: 'english'
    }
});

module.exports = mongoose.model('configure_user', mySchema);