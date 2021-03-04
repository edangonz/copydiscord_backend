const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', function(req, res){
    controller.getDataChat(req.body.id_chat)
        .then((body) => response.success(req, res, body.code, body.data, 'Get data chat', 200, `Get data chat to ${req.body.id_chat}`))
        .catch((err) => response.error(req, res, err.code, 'No get data chat', 400, `No get data chat ${res.body.id_chat}`));
});

/*
router.post('/', function(req, res){
    controller.addMessage(req.body.id_user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201)
        })
        .catch(e => {
            response.error(req, res, "Informacion invalida", 400, 'Error en el controlador')
        });
});
*/
module.exports = router;