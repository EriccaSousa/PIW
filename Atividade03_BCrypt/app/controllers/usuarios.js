const bcrypt = require("bcrypt");
const Usuario = require('../models/usuario');
const view = require('../views/usuarios');
const Post = require('../models/posts');
const viewPost = require('../views/post');
const usuario = require('../models/usuario');


module.exports.cadastrarUsuario = function(req, res) {
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10),
    }
    let promise = Usuario.create(usuario);

    console.log(promise)

    promise.then((usuario) => {
        res.status(201).json(view.render(usuario));
    }).catch((error) => {
        res.status(400).json({message: "Erro ao realizar cadastro."});
    });
}

module.exports.listarUsuarios = function(req, res) {
    let promise = Usuario.find().exec();

    promise.then((usuarios) => {
        res.status(200).json(view.renderMany(usuarios));
    }).catch((error) => {
        res.status(500).json({message: "Erro ao carregar Usuários.", error: error});
    });
}

module.exports.buscarUsuarioById = function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();

    promise.then((usuario)=>{
        res.status(200).json(view.render(usuario));
    }).catch((error)=>{
            res.status(404).json({message: "Usuário não encontrado.", error: error});
    });
} 

module.exports.deletarUsuarioById = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findByIdAndDelete(id).exec();

    promise.then((usuario)=>{
        res.status(200).json(view.render(usuario))
    }).catch((error)=>{
            res.status(400).json({message: "Usuário não encontrado.", error: error})
    });
}

module.exports.BuscarPostByIdUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Post.find({usuario:id}).exec();

    promise.then((post) => {
        res.status(200).json(viewPost.renderMany(post));
    }).catch((error) => {
            res.status(400).json({message: "Post não encontrado.", error: error});
    });
}


