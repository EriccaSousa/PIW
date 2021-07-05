function render(post) {
    return {
        id: post._id,
        text: post.texto,
        likes: post.likes,
        usuario: post.id_usuario
    }
}
module.exports.render = render

function renderMany(posts) {
    return posts.map((post) => render(post))
}
module.exports.renderMany = renderMany