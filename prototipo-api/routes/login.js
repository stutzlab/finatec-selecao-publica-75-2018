const express = require('express');
const router = express.Router();
const login = require('../modules/login');

router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {
    login.tryLogin(req, res, next);
});

router.post('/logout', function(req, res, next){
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;