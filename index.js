const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const PORT = process.env.PORT || 5000

const router_auth = require('./components/user/network');
const router_friend = require('./components/friends/network');
const router_request = require('./components/request_friend/network');

const middleware_auth = require('./middleware');

const db = require('./db');

db.connect();

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v0', router_auth);
app.use('/api/v0/friend', middleware_auth, router_friend);
app.use('/api/v0/request_friend', middleware_auth, router_request);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));