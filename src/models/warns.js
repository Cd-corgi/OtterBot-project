const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    warns: [{
        id: Number,
        reason: String,
        date: Date,
        author: String
    }]
})

module.exports = mongoose.model("warn_list", Schema)