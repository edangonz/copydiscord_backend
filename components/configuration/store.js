const Configure = require('./model')

async function generateConfiguration(){
    const configure = new Configure();
    return await configure.save();
}

async function getConfigurateById(_id){
    const con = await Configure.findOne({ _id: _id });

    return (con)? { _id: con._id, state_user : con.state_user, language : con.language } : undefined;
}

async function addOpenChat(filter, id_user){
    const configure = await Configure.findOne(filter);
    configure.chat_open.push(id_user);
    await configure.save();
    return {code: 400}
}

async function closeOpenChat(filter, id_user){
    const configure = await Configure.findOne(filter);
    configure.chat_open = configure.chat_open.filter((value, index, arr) => value != id_user);
    await configure.save();
    return {code: 400}
}

module.exports = {
    generateConfiguration: generateConfiguration,
    getConfigurateById: getConfigurateById,
    addOpenChat: addOpenChat,
    closeOpenChat: closeOpenChat,
}