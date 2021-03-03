const RequestFriend = require('./request_friend')
const User = require('../user/model');
const Friends = require('../friends/friends')

const { createChat } = require('../chat/store');
const { getFriendsFileById } = require('../friends/store')

async function sendRequest(transmitter, receiver) {
    if(!receiver._id || !transmitter._id)
        return {code: 408, message: "Error create request"};

    const current_user = await User.findOne(transmitter);
    const friends_current_user = await Friends.findOne({_id: current_user._id_friends});

    for (f of friends_current_user.friends) {
        if(f._id == receiver._id)
            return {code: 406, message: "We were friends"}
    }

    for (r of friends_current_user.request) {
        if(r._id == receiver._id)
            return {code: 405, message: "Request pending"}
    }

    for (p of friends_current_user.pending) {
        if(p._id == receiver._id)
            return await aceptRequest(transmitter._id, receiver._id)
    }

    const current_friend = await User.findOne(receiver);
    const friends_current_friend = await Friends.findOne({_id: current_friend._id_friends});
          
    friends_current_user.request.push({_id : receiver._id, send_date: new Date()})
    friends_current_friend.pending.push({_id : transmitter._id, send_date: new Date()})

    if(!friends_current_user.validateSync() && !friends_current_friend.validateSync()){
        friends_current_user.save();
        friends_current_friend.save()
        return {code: 401, _id: receiver._id, message: 'Send request friend'};
    } return {code: 408, message: "Error create request"};
}

async function updateFriends(filter){
    const user = await User.findOne(filter);
    if (user) {
        const file_friends = await getFriendsFileById(user._id_friends)
        if(file_friends)
            return {code: 400, data : file_friends}
    } return {code : 409, data: []}
}

async function aceptRequest(_id_reciever, _id_transmiter){
    const transmitter_file = await User.findOne({_id: _id_transmiter});
    const receiver_file = await User.findOne({_id: _id_reciever});

    if(transmitter_file && receiver_file) {
        let new_chat = await createChat();
        
        if(new_chat){
            const transmitter = await processRequest(transmitter_file, receiver_file, new_chat)

            //notification: {type: 3001, id_user: request.id_transmitter, id_user_acepted: request.id_receiver , date: new Date()}
            return {code: 402, _id: transmitter._id};
        }   return {code: 407};
    }   return {code: 407};
}

async function deleteRequet(_id_reciever, _id_transmiter){
    const transmitter_file = await User.findOne({_id: _id_transmiter});
    const receiver_file = await User.findOne({_id: _id_reciever});

    
    if(transmitter_file && receiver_file) {
        await processRequest(transmitter_file, receiver_file, undefined)
        return {code: 404};
    } return {code: 407};
}

async function processRequest(transmitter_file, receiver_file, new_chat) {
    const transmitter = await Friends.findOne({_id : transmitter_file._id_friends})
    const receiver = await Friends.findOne( {_id : receiver_file._id_friends})

    if(new_chat){
        transmitter.friends.push({_id: receiver_file._id, _id_chat: new_chat._id, state_open: false});
        receiver.friends.push({_id: transmitter_file._id, _id_chat: new_chat._id, state_open: false});
    }
    
    receiver.pending = receiver.pending.filter((value, index, arr) => value._id != transmitter_file._id);
    receiver.save();
    
    transmitter.request = transmitter.request.filter((value, index, arr) => value._id != receiver_file._id);
    return await transmitter.save();
}

module.exports = {
    sendRequest: sendRequest,
    updateFriends: updateFriends,
    deleteRequet: deleteRequet,
    aceptRequest: aceptRequest,
}