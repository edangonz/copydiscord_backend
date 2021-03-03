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

function updateFriends(_id){
    return new Promise(async (resolve, reject) => {
        let data = await store.updateFriends({_id: _id})
        if(data)
            resolve(data);
        else
            reject({code : 407});
    });
}

function aceptRequest(_id, id_user){
    return new Promise(async (resolve, reject) => {
        let data = await store.aceptRequest(_id, id_user)
        if(data)
            resolve(data);
        else
            reject({ code : 407 });
    });
}

function deleteRequet(_id, id_user){
    return new Promise(async (resolve, reject) => {
        let data = await store.deleteRequet(_id, id_user)
        if(data)
            resolve(data);
        else
            reject({code : 407});
    });
}

module.exports = {
    sendRequest,
    updateFriends,
    aceptRequest,
    deleteRequet,
}