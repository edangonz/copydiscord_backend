const store = require('./store');
/*
function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if(!user || !message){
            console.error('[messageController] no hay usuario mensaje')
            reject('Los datos son incorrectos');
            return false;
        }
        
        const fullMessage = {
            id_user: user,
            message: message,
            data: new Date(),
        }
    
        store.add(fullMessage)
            .then((message) => resolve(message))
            .catch((e) => reject(e));
        
    })
}
*/
function getDataChat(id_chat){
    return new Promise(async (resolve, reject) => {
        let data = await store.getDataChat({_id: id_chat})
        if(data)
            resolve(data);
        else
            reject({code : 504});
    });
}

module.exports = {
    getDataChat,
}