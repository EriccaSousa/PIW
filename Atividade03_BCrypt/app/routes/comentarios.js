let controller = require("../controllers/comentarios");
let controllerAuth = require("../controllers/auth.js");

module.exports = function(app) {
    app.post("/api/usuarios/", controllerAuth.checar);
    app.post("/api/comentarios", controller.cadastrarComentarios);
    app.get("/api/comentarios", controller.listarComentarios);
    app.delete("/api/comentarios/:id", controller.deleteComentariosById);
}