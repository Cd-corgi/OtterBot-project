const mongoose = require('mongoose');

let wel = new mongoose.Schema({
    guildID: String,
    channelID: String,
    welMessage: String,
    welImage: String,
    welTextColor: String
})

module.exports = new mongoose.model("welcomes", wel, "Welcomes");