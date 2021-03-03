const express = require('express');
//const { emitNotification, emitRequestFriend } = require('../../socket.io');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    controller.sendRequest(req.user._id, req.body._id)
        .then((body) => response.success(req, res, body.code, undefined, body.message, 200, `${body.message} of ${req.body._id}`))
        .catch((err) => response.error(req, res, err.code, 'No create request friend', 400, `No send request friend of ${req.body._id}`));
});

router.get('/', (req, res) => {
    controller.updateFriends(req.user._id)
        .then((body) => response.success(req, res, body.code, body.data, 'Get requests friend', 200, `Get requests friend of ${req.body._id}`))
        .catch((err) => response.error(req, res, err.code, 'No get requests friend', 400, `No get requests friend of ${req.body._id}`));
});

router.put('/', (req, res) => {
    controller.aceptRequest(req.user._id, req.body._id)
        .then((body) => response.success(req, res, body.code, body.data, 'Acept requests friend', 200, `Acept requests friend of ${req.body._id}`))
        .catch((err) => response.error(req, res, err.code, 'No acept requests friend', 400, `No acept requests friend of ${req.body._id}`));
});

router.delete('/', (req, res) => {
    console.log(req.user._id, req.body._id)
    controller.deleteRequet(req.user._id, req.body._id)
        .then((body) => response.success(req, res, body.code, undefined, 'Delete requests friend', 200, `Delete requests friend of ${req.body._id}`))
        .catch((err) => response.error(req, res, err.code, 'No delete requests friend', 200, `No delete requests friend of ${req.body._id}`));
});

module.exports = router;