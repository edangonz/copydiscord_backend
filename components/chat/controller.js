const store = require('./store');

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

function getDataChat(filter){
    return new Promise(async (resolve, reject) => {
        let data = await store.getDataChat({_id: filter})
        if(data)
            resolve(data);
        else
            reject([]);
    });
}

module.exports = {
    addMessage,
    getDataChat,
}