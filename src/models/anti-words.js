const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildID: String,
    words: [{
        word: String
    }]
});

module.exports = new mongoose.model("anti-word", Schema)