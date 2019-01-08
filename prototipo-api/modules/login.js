const jwt = require('jsonwebtoken');
const basicAuth = require('basic-auth');
const User = require('./model/User');

const JWT_SECRET = "secret";

const tryLogin = function(req, res, next) {
    var credentials = basicAuth(req);
    if (!credentials) {
        resultLogin(req, res, next, false);
    }

    User.findOne({ username: credentials.name }, function(err, user) {
        if (err) throw err;
        if(user){
            user.comparePassword(credentials.pass, function(err, isMatch) {
                if (err) throw err;
                result = isMatch;
                resultLogin(req, res, next, result, credentials.name);
            });
        }else{
            resultLogin(req, res, next, false);
        }
    });
}

const resultLogin = function(req,res, next, result, name){
    if(result){
        var token = jwt.sign({ name }, JWT_SECRET, {
            expiresIn: 600 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
    }else{
        res.status(500).send('Login inválido!');
    }    
}

const verifyJWT = function(req, res, next){
    var token = req.headers['Authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

module.exports = {
    tryLogin,
    verifyJWT
}