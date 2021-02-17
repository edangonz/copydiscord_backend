const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const controller = require('./controller');

const response = require('../../network/response');

//path of this part /api/v0

//Created a new user
router.post('/create', async  (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  controller.addUser(username, password)
    .then((new_user) => {
      const accessToken = jwt.sign(new_user, process.env.ACCESS_TOKEN_SECRET);
      new_user['access-token'] = accessToken;
      response.success(req, res, 102, new_user, 'User created', 201, 'New user created')
    })
    .catch((err) => response.error(req, res, err.code, 'No user created', 400, 'Error in user created'));
});

//Verify if user exits and return new token
router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  controller.getUserByUsername(username, password)
    .then((user) => {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      user['access-token'] = accessToken;
      response.success(req, res, 100, user, 'Authentication successful', 200, `Send token to ${username}`);
    })
    .catch(() => response.error(req, res, 105, 'wrong credentials', 400, `Wrong credentials, login ${username}`));
});

//Verify if user exits in DB
router.get('/login', (req, res) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {   
          if (err) 
            response.error(req, res, 104, 'Invalid token', 400, `Invalid token decofication`);
          else {
            controller.getDataByToken(decoded)
              .then((user) => response.success(req, res, 101, user, 'Get data user', 200, `Get data user ${user.username}`))
              .catch(() => response.error(req, res, 104, 'No user token', 400, 'No user token'));
          }
        });
    } else
      response.error(req, res, 103, 'No token', 400, `No token`);
});

module.exports = router;