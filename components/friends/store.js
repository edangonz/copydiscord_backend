//const { getIdSession } = require('../../socket.io');
const Friends = require('./friends');
const User = require('../user/model');

//generate Friend file
async function generateFriendsFile(){
    const friends = new Friends();
    
    return await friends.save();
}

//return a file of Friends found with id
async function getFriendsFileById(_id){
    const fien = await Friends.findOne({ _id: _id });

    for ( u of fien.friends){
        let temp_user = await User.findOne({_id: u._id})
        u.username = temp_user.username
    }

    for ( r of fien.request){
        let temp_user = await User.findOne({_id: r._id})
        r.username = temp_user.username
    }

    for ( p of fien.pending){
        let temp_user = await User.findOne({_id: p._id})
        p.username = temp_user.username
    }

    return (fien)? { _id: fien._id, friends : fien.friends, request : fien.request, pending : fien.pending } : undefined;
}

//search userser that has similar segments of letters
async function searchFriends(filter, _id){
    const list_user = await User.find(filter).limit(10);
    if(list_user.length > 0){
        let listFilterFriends = [];
        for(let u of list_user){
            if(u._id != _id)
                listFilterFriends.push({_id: u._id, username: u.username});
        }
        return {code : 201, message: 'Getting friends filter', data : listFilterFriends};
    } return {code : 207, message: 'Empty list friends'}
}

async function deleteFriend(filter_user, filter_friend){
    const user = await User.findOne(filter_user);
    const friend = await User.findOne(filter_friend);

    if(friend && user) {
        friend.friends = friend.friends.filter((value, index, arr) => value.id_user != user._id);
        await friend.save();

        user.friends = user.friends.filter((value, index, arr) => value.id_user != friend._id);;
        await user.save();

        return {code: 206, _id: friend._id};            
    } else
        return {code: 204}; 
}

async function open_chat(_id, id_friend, new_state) {
    const user = await User.findOne({_id: _id});
    const friend = await Friends.findOne({_id: user._id_friends});

    if(friend) {
        friend.friends = friend.friends.filter((value, index, arr) => {
            if(value._id == id_friend)
                value.state_open = new_state
            return value;
        });
        
        await friend.update({friends : friend.friends});
        return {code: 206};            
    } return {code: 204}; 
} 

module.exports = {
    generateFriendsFile : generateFriendsFile,
    getFriendsFileById: getFriendsFileById,
    search: searchFriends,
    deleteFriend: deleteFriend,
    open_chat: open_chat
}