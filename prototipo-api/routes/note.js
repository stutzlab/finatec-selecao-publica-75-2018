const express = require('express');
const router = express.Router();
const Notes = require('../modules/model/Note')

/* GET home page. */
router.get('/list', function(req, res, next) {
    Notes.find({}, (err, result)=> {
        res.send(result);
    });
});
  
router.post('/', function(req, res, next) {
    let json = req.body;
    if(json._id){
        Notes.updateOne({ _id: json._id }, { note: json.note }, (err, success)=>{
            if(err){
                res.send({ message: "Erro ao executar atualização"})
            }
            if(success){
                res.send({ message: "Atualizado com Sucesso!"})
            }else{
                res.send({ message: "Registro Não Atualizado"})
            }
        })
    }else{
        var note = new Notes({ note: json.note});
        note.save();
        res.send({ message: "Registro adicionado com Sucesso"});
    }
});

module.exports = router;