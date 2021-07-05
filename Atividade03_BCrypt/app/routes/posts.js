const controller = require("../controllers/posts");
const controllerAuth = require("../controllers/auth.js");

module.exports = function(app){
    app.use("/api/usuarios/", controllerAuth.checar);
    app.post("/api/posts", controller.cadastrarPost);
    app.get("/api/posts", controller.listarPosts);
    app.get("/api/posts/:id", controller.buscarPostById);
    app.delete("/api/posts/:id", controller.deletarPostById);
    app.get("/api/post/:id/comentarios", controller.buscarComentariosPorPostId);
}