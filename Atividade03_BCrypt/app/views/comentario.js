function render (comentario) {
    return {
        id: comentario._id,
        text: comentario.texto,
        usuario: comentario.id_usuario,
        post: comentario.id_post
    }
}
module.exports.render = render

function renderMany(comentarios) {
    return comentarios.map(render)
}
module.exports.renderMany = renderMany