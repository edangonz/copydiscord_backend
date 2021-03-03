const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
//const { emitNotification } = require('../../socket.io');

router.post('/search', (req, res) => {
    controller.searchFriends(req.body.username, req.user)
        .then((body) => response.success(req, res, body.code, body.data, body.message, 200, `${body.message} ${req.user.username}`))
        .catch((err) => response.error(req, res, err.code, 'No getting filter friends', 400, `Error getting filter friends ${req.user.username}`));
});

router.delete('/', (req, res) => {
    controller.deleteFriend(req.user._id, req.body._id)
        .then((body) => {
            //emitNotification(body);
            response.success(req, res, body.code, undefined, 'Delete friend', 200, `Delete  friend of ${req.user.username}`)
        }).catch(() => response.error(req, res, 204, 'No delete  friend', 400, `No delete  friend of ${req.user.username}`));
});

router.patch('/chat_open', (req, res) => {
    controller.open_chat(req.user._id, req.body._id, true)
        .then((body) => response.success(req, res, body.code, body.data, `Open chat ${req.body._id}`, 200, `Open chat ${req.body._id} of ${req.user.username}`))
        .catch((err) => response.error(req, res, err.code, 'No Open chat', 400, `Error Open chat ${req.user.username}`));
});

router.patch('/chat_close', (req, res) => {
    controller.open_chat(req.user._id, req.body._id, false)
        .then((body) => response.success(req, res, body.code, body.data, `Close chat ${req.body._id}`, 200, `Close chat ${req.body._id} of ${req.user.username}`))
        .catch((err) => response.error(req, res, err.code, 'No Close chat', 400, `Error Close chat ${req.user.username}`));
});

module.exports = router;