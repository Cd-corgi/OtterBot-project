const mongoose = require('mongoose')

let schem = new mongoose.Schema({
    guildID: String,
    logChannel: String
})

module.exports = new mongoose.model("report", schem)