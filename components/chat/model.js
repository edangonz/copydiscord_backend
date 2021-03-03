const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    list_messages: {
        type: Array,
        required: true,
        default: [],
    },
    previous_id_chat: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('chat', mySchema);