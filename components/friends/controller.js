const store = require('./store');

function searchFriends(username, user) {
    return new Promise(async (resolve, reject) => {
        let data = await store.search({username: { $regex: username, $options: "i" }}, user._id);
        if(data)
            resolve(data);
        else
            reject({code : 204});
    });
}

function deleteFriend(_id, id_friend){
    return new Promise(async (resolve, reject) => {
        let data = await store.deleteFriend({_id: _id}, {_id: id_friend})
        if(data)
            resolve(data);
        else
            reject([]);
    });
}

module.exports = {
    searchFriends,
    deleteFriend,
}