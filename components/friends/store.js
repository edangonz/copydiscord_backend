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

    return (fien)? { _id: fien._id, friends : fien.friends, request : fien.request, pending : fien.pending } : undefined;
}

//search userser that has similar segments of letters
async function searchFriends(filter, _id){
    const list_user = await User.find(filter).limit(10);
    let listFilterFriends = [];
    for(let u of list_user){
        if(u._id != _id)
            listFilterFriends.push({_id: u._id, username: u.username});
    }
    return listFilterFriends;
}

async function deleteFriend(filter_user, filter_friend){
    const user = await User.findOne(filter_user);
    const friend = await User.findOne(filter_friend);

    if(friend && user) {
        friend.friends = friend.friends.filter((value, index, arr) => value.id_user != user._id);
        friend.save();

        user.friends = user.friends.filter((value, index, arr) => value.id_user != friend._id);;
        user.save();

        return {code: 206, _id: friend._id};            
    } else
        return {code: 204}; 
}

module.exports = {
    generateFriendsFile : generateFriendsFile,
    getFriendsFileById: getFriendsFileById,
    search: searchFriends,
    deleteFriend: deleteFriend,
}