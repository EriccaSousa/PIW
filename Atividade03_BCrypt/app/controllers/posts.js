const jwt = require("jsonwebtoken");
const Post = require('../models/posts');
const view = require('../views/post');
const Comentarios = require('../models/comentarios');

module.exports.cadastrarPost = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario = payload.id;

    console.log("Usuário: ", id_usuario);

    let promisse = Post.create({texto: req.body.texto, likes: req.body.likes, usuario: id_usuario});

    promisse.then((post)=>{
        res.status(201).json(view.render(post));
    }).catch((error)=>{
        res.status(400).json({message: "error message"});
    });

}

module.exports.listarPosts = function(req, res) {
    let promisse = Post.find().exec();

    promisse.then((post)=>{
        res.status(200).json(view.renderMany(post));
    }).catch((error)=>{
        res.status(400).json({message: "error message"});
    });
}

module.exports.buscarPostById = function(req, res){
    let id = req.params.id;
    let promise = Post.findById(id).exec();

    promise.then((post)=>{
        res.status(200).json(view.render(post));
    }).catch((error)=>{
            res.status(404).json({message: "Post not found", error: error});
    });
} 

module.exports.deletarPostById = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let id_usuario = payload.id;

    let id = req.params.id;
    let promise = Post.findByIdAndDelete(id).exec();

    console.log(promise)

    promise.then((post)=>{
        res.status(200).json(view.render(post));
    }).catch((error)=>{
            res.status(400).json({message: "Post not found", error: error});
    });
}

module.exports.buscarComentariosPorPostId = function(req, res) {
    let id = req.params.id;
    let promise = Comentarios.find({post:id}).populate("usuario").exec();

    console.log(promise);

    promise.then((comentarios) => {
        res.status(200).json(view.renderMany(comentarios));
    }).catch((error) => {
        console.log(error)
            res.status(404).json({message: "post not found", error: error});
    });
}
