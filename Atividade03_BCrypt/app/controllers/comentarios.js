const { findByIdAndDelete } = require('../models/comentarios');
const Comentarios = require('../models/comentarios');
const view = require('../views/comentario');

module.exports.cadastrarComentarios = function(req, res) {
    let comentario = req.body;
    let promisse = Comentarios.create(comentario);

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