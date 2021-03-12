const Chat = require('./model')

async function createChat(){
    const new_chat = new Chat();
    return await new_chat.save();
}

async function getDataChat(filter){
    const chat = await Chat.findOne(filter);
    if(chat)    
        return {code: 500, data: chat};
    return {code: 503}; 
}

module.exports = {
    createChat: createChat,
    getDataChat: getDataChat,
}