const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    Channels: [{
        ChannelID: String
    }]
});

module.exports = new mongoose.model("anti-spam", Schema)