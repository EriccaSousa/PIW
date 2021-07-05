const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.js");

module.exports.logar = function(req, res) {
    Usuario.findOne({email: req.body.email})
        .then(function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)){
                let token = jwt.sign({id: usuario._id}, "senha");
                res.status(200).json({token: token});
            }else{
                res.status(401).send("Credenciais erradas");
            }
        })
        .catch(function(error){
            res.status(401).send("Credenciais errada")
        })
}

module.exports.checar = function(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, "senha", function(err, decoded){
        if(err){
            res.status(401).send("Token inválido");
        }else{
            next();
        }
    });
}