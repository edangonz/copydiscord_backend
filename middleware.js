const express = require('express');
const jwt = require('jsonwebtoken');
const middleware_auth = express.Router();

middleware_auth.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { 
      if (err)
        return res.json({ message: 'Token inválida' });    
      req.user = decoded;    
      next();
    });
  } else {
    res.send({ 
      message: 'Token no proveída.' 
    });
  }
});

module.exports = middleware_auth;