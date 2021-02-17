require('dotenv').config();

const db = require('mongoose');

db.Promise = global.Promise;

async function connect() {
    db.set('useCreateIndex', true)
    await db.connect(process.env.URL_BD, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    );
    console.log('[db] Conectada con exito');
}

module.exports = {
    connect
}