const User = require('./model')
const { generateConfiguration, getConfigurateById } = require('../configuration/store');
const { generateFriendsFile, getFriendsFileById } = require('../friends/store')

async function addNewUser(user){
    const new_configuration = await generateConfiguration();
    const new_frientFile = await generateFriendsFile();
    
    const newUser = new User({...user, _id_configuration : new_configuration._id, _id_friends : new_frientFile._id});
    return newUser.save();
}

//get a user data to _id file
async function getUserById(filter, username){
    const user = await User.findOne(filter);
    return (user.username == username)? await addConfigurate(user): undefined;
}

async function getUserForUsername(username){
    return (username)?
        await User.findOne({username : username}):
        undefined;
}

async function addConfigurate(user){
    if(user){
        const con = await getConfigurateById(user._id_configuration);
        const fien = await getFriendsFileById(user._id_friends);
        return { _id: user._id, username: user.username, configuration: con, friends : fien };
    } return undefined;
}

module.exports = {
    getUserById: getUserById,
    getUserForUsername: getUserForUsername,
    addNewUser: addNewUser,
    addConfigurate : addConfigurate,
}