const express = require('express');
//const { emitNotification, emitRequestFriend } = require('../../socket.io');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    const user = req.user;
    controller.sendRequest(user._id, req.body._id)
        .then((body) => {
            //emitRequestFriend(body);
            response.success(req, res, body.code, undefined, body.message, 200, `${body.message} of ${req.body._id}`);
        }).catch((err) => response.error(req, res, err.code, 'No create request friend', 400, `No send request friend of ${req.body._id}`));
});

router.get('/', (req, res) => {
    controller.getRequets(req.user._id)
        .then((body) => response.success(req, res, body.code, body, 'Get requests friend', 200, `Get requests friend of ${req.body._id}`))
        .catch(() => response.error(req, res, 407, 'No get requests friend', 400, `No get requests friend of ${req.body._id}`));
});
/*
router.put('/', (req, res) => {
    controller.aceptRequest(req.body._id, req.decoded)
        .then((body) => {
            emitNotification(body);
            response.success(req, res, body.code, body, 'Acept requests friend', 200, `Acept requests friend of ${req.body._id}`);
        })
        .catch(() => response.error(req, res, 407, 'No acept requests friend', 400, `No acept requests friend of ${req.body._id}`));
});

router.delete('/', (req, res) => {
    controller.deleteRequet(req.body._id, req.decoded)
        .then((body) => response.success(req, res, body.code, undefined, 'Delete requests friend', 200, `Delete requests friend of ${req.body._id}`))
        .catch(() => response.error(req, res, 407, 'No delete requests friend', 200, `No delete requests friend of ${req.body._id}`));
});
*/
module.exports = router;