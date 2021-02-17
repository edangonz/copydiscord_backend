const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    id_transmitter : {
        type: String,
        required: true,
    },
    id_receiver: {
        type: String,
        required: true,
    },
    send_date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('request_friend', mySchema);