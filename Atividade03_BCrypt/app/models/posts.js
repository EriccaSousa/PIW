const mongoose = require('mongoose')

module.exports = function(){
    var schema = mongoose.Schema({
        texto: {
           type: "String",
           required: true
        },
        likes: {
            type: Number,
            required: true
        },
        usuario: {
            type: mongoose.Schema.ObjectId,
            ref: "usuario"
        }
    
    })
    return mongoose.model("post", schema)
}()