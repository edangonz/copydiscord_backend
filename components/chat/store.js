const Chat = require('./model')

async function createChat(){
    const new_chat = new Chat();
    return await new_chat.save();
}
/*
async function getDataChat(filter){
    const chat = await Chat.findOne(filter);
    if(chat)    
        return {code: 500, chat: chat};
    return {code: 503}; 
}

async function addMessage(message, onwer, filter){
    const chat = await Chat.findOne(filter);
    if(chat) {
        let new_message = {message: message, onwer: onwer, date: new Date()};

        if(chat.list_messages.length >= 50){
            const previous_chat = await createChat();
            if(chat.previous_id_chat)
                previous_chat.previous_id_chat = chat.previous_id_chat;
            previous_chat.list_messages = chat.list_messages;
            
            chat.previous_id_chat = previous_chat._id;
            chat.list_messages = [];
            previous_chat.save();
        }
        
        chat.list_messages.push(new_message);
        await chat.save();
        return {_id: chat._id, ...new_message};
    }
}
*/
module.exports = {
    createChat: createChat,/*
    getDataChat: getDataChat,
    addMessage: addMessage,*/
}