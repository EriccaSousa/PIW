const mongoose = require('mongoose')

module.exports = function(){
    var schema = mongoose.Schema({
        texto: {
           type: "String",
           required: true
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: "post"
        },
        usuario: {
            type: mongoose.Schema.ObjectId,
            ref: "usuario"
        }
    
    })
    return mongoose.model("comentario", schema)
}()