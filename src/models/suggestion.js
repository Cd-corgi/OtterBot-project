const mongoose = require('mongoose');

let sug = new mongoose.Schema({
    guildId: String,
    channelId: String
})

module.exports = mongoose.model("sug", sug, "Suggestions")