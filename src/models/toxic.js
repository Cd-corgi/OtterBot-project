const mongoose = require('mongoose')

let shem = new mongoose.Schema({
    guildID: String,
    Msg: String
})

module.exports = mongoose.model("toxic", shem, "Anti-toxic")