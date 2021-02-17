const RequestFriend = require('./request_friend')
const User = require('../user/model');
const Friends = require('../friends/friends')

//const { createChat } = require('../chat/store');

async function sendRequest(transmitter, receiver) {
    if(!receiver._id || !transmitter._id)
        return {code: 408, message: "Error create request"};

    const current_user = await User.findOne(transmitter);
    const friends_current_user = await Friends.findOne({_id: current_user._id_friends});

    for (f of friends_current_user.friends) {
        if(f._id == receiver._id)
            return {code: 406, message: "We were friends"}
    }
    
    let request = await RequestFriend.findOne({id_transmitter : transmitter._id, id_receiver: receiver._id}) || await RequestFriend.findOne({id_transmitter : receiver._id, id_receiver: transmitter._id});

    if(!request){
        const new_request = new RequestFriend({id_transmitter : transmitter._id, id_receiver: receiver._id, send_date: new Date()});
            
        if(!new_request.validateSync()){
            new_request.save()
            return {code: 401, _id: receiver._id, message: 'Send request friend'};
        } else
            return {code: 408, message: "Error create request"};
    } else
        return {code: 405, message : "Request pending"};
}
/*
async function getRequets(filter){
    const list = await RequestFriend.find(filter);
    let list_requests = [];
    for(let r of list){
        const current_user = await User.findOne({_id: r.id_transmitter});
        list_requests.push({_id: r._id, username: current_user.username, _id_user: current_user._id});
    }
    return list_requests;
}

async function aceptRequest(filter){
    const request = await RequestFriend.findOne(filter)

    if(request) {
        const id_transmitter = await User.findOne({_id: request.id_transmitter});
        const id_receiver = await User.findOne({_id: request.id_receiver});

        if(id_transmitter && id_receiver) {
            let new_chat = await createChat(); 

            if(new_chat){
                id_transmitter.friends.push({id_user: request.id_receiver, id_chat: new_chat._id, state_open: false});
                id_transmitter.save();

                id_receiver.friends.push({id_user: request.id_transmitter, id_chat: new_chat._id, state_open: false});
                id_receiver.save();

                request.deleteOne();

                return {code: 402, _id: request.id_transmitter, notification: {type: 3001, id_user: request.id_transmitter, id_user_acepted: request.id_receiver , date: new Date()}};
            } else
                return {code: 407};
        } else
            return {code: 407}; 
    } else
        return {code: 407};
}

async function deleteRequet(filter){
    const request = await RequestFriend.findOne(filter)
    if(request) {
        request.deleteOne();
        return {code: 404};
    } else
        return {code: 407};
}
*/
module.exports = {
    sendRequest: sendRequest,/*
    getRequets: getRequets,
    deleteRequet: deleteRequet,
    aceptRequest: aceptRequest,*/
}