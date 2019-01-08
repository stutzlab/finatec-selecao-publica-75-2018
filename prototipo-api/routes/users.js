const express = require('express');
const router = express.Router();
const User = require('../modules/model/User');
const hash = "abc123";


/* GET users listing. */
router.get('/list', function(req, res, next) {
  User.find({}, (err, result)=> {
    res.send(result);
  });
});

router.post('/createUser', function(req, res, next) {
  let json = req.body;
  if(json.hash == hash){
    let user = new User({ username: json.username , password: json.password });
    user.save();
    res.send({ message: "Usuário criado com sucesso"})
  }else{
    res.status(400).send({ message: "Erro ao criar usuário, chave inválida"});
  }
});



module.exports = router;
