const bcrypt = require('bcrypt');
const store = require('./store');

function addUser(username, password) {
    return new Promise(async (resolve, reject) => {
        if(!username || !password){
            console.error('[messageController] credenciales invalidas')
            reject({code: 105});
        } else {
            const newUser = {
                username: username,
                password: await bcrypt.hash(password, 10),
            }
        
            store.addNewUser(newUser)
                .then(async (user) => resolve(await store.addConfigurate(user)))
                .catch((err) => reject({code: (err.code == '11000')? 107 : 106}));
        }
    })
}

function getUserByUsername(username, password){
    return new Promise(async (resolve, reject) => {
        let docUser = await store.getUserForUsername(username)
        if(docUser) {
            bcrypt.compare(password, docUser.password, async (err, same) => {
                (same)?
                    resolve(await store.addConfigurate(docUser))
                    :reject(err? err: {});
            });
        } else
            reject({code: 105});
    })
}

function getDataByToken({_id, username}){
    return new Promise(async (resolve, reject) => {
        const user = await store.getUserById({_id: _id}, username)
        if (user)
            resolve(user)
        else
            reject({code: 104});    
    })
}

module.exports = {
    addUser,
    getUserByUsername: getUserByUsername,
    getDataByToken: getDataByToken,
}