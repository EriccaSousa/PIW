const jwt  = require('jsonwebtoken');
const { findByIdAndDelete } = require('../models/comentarios');
const Comentarios = require('../models/comentarios');
const view = require('../views/comentario');

module.exports.cadastrarComentarios = function(req, res) {
    let id_post = req.body.post;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario = payload.id;

    console.log(req.headers);
    console.log("Usuário: ", id_usuario);
    console.log("Post: ", id_post);

    let promisse = Comentarios.create({texto: req.body.texto, post: id_post, usuario: id_usuario});
    
    promisse.then((comentario) => {
        res.status(201).json(view.render(comentario));
    }).catch((error)=>{
        res.status(400).json({message: "Erro ao enviar comentário."});
    });

}

module.exports.listarComentarios = function(req, res) {
    let promisse = Comentarios.find().populate("post").populate("usuario").exec();

    promisse.then((comentario) => {
        res.status(200).json(comentario);
    }).catch((error) => {
        res.status(404).json({message: "Comentario não encontrado."});
    });
}


module.exports.deleteComentariosById = function(req, res) {
    let id = req.params.id;
    let promise = Comentarios.findByIdAndDelete(id).exec();

    promise.then((comentario)=>{
        res.status(200).json(view.render(comentario))
    }).catch((error)=>{
            res.status(404).json({message: "Comentario não encontrado.", error: error})
        }
    )
}  