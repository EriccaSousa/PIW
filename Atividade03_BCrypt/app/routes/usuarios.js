const controller = require("../controllers/usuarios");
const controllerAuth = require("../controllers/auth.js");

module.exports = function(app){
    app.post("/api/usuarios/signin", controllerAuth.logar);
    app.post("/api/usuarios", controller.cadastrarUsuario);
    
    app.use("/api/usuarios/", controllerAuth.checar);
    app.get("/api/usuarios", controller.listarUsuarios);
    app.get("/api/usuarios/:id", controller.buscarUsuarioById);
    app.get("/api/usuarios/:id/post", controller.BuscarPostByIdUsuario);
    app.delete("/api/usuarios/:id", controller.deletarUsuarioById);
}