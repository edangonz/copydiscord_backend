const store = require('./store');

function sendRequest(id_transmitter, id_receiver) {
    return new Promise(async (resolve, reject) => {
        let data = await store.sendRequest({_id: id_transmitter}, {_id: id_receiver})
        if(data)
            resolve(data);
        else
            reject({code : 408});
    });
}
/*
function getRequets(user){
    return new Promise(async (resolve, reject) => {
        let data = await store.getRequets({id_receiver: user.id_user})
        if(data)
            resolve(data);
        else
            reject([]);
    });
}

function deleteRequet(_id, user){
    return new Promise(async (resolve, reject) => {
        let data = await store.deleteRequet({_id: _id, id_receiver: user.id_user})
        if(data)
            resolve(data);
        else
            reject([]);
    });
}

function aceptRequest(_id, user){
    return new Promise(async (resolve, reject) => {
        let data = await store.aceptRequest({_id: _id, id_receiver: user.id_user})
        if(data)
            resolve(data);
        else
            reject([]);
    });
}
*/
module.exports = {
    sendRequest,/*
    getRequets,
    deleteRequet,
    aceptRequest,*/
}