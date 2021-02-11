const mongoose = require('mongoose') // Requerimos a mongoose
let Confess = new mongoose.Schema({ // Creamos un esquema
serverID: { type: String }, // La guild
channelID: { type: String } // El canal
}) // Cerramos
module.exports = mongoose.model('Confess', Confess, 'confession')