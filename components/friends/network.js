const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
//const { emitNotification } = require('../../socket.io');

router.post('/search', (req, res) => {
    const user = req.user;
    controller.searchFriends(req.body.username, user)
        .then((body) => response.success(req, res, body.code, body.data, body.message, 200, `${body.message} ${user.username}`))
        .catch((err) => response.error(req, res, err.code, 'No getting filter friends', 400, `Error getting filter friends ${user.username}`));
});

router.delete('/', (req, res) => {
    const user = req.user;
    controller.deleteFriend(user.id_user, req.body._id)
        .then((body) => {
            //emitNotification(body);
            response.success(req, res, body.code, undefined, 'Delete friend', 200, `Delete  friend of ${user.username}`)
        }).catch(() => response.error(req, res, 204, 'No delete  friend', 400, `No delete  friend of ${user.username}`));
});

module.exports = router;