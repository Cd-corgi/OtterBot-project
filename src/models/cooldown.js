const mongoose = require('mongoose')

let schem = new mongoose.Schema({
    userID: String,
    strikes: Number,
    cooldown: Number
});

module.exports = mongoose.model('cooldown', schem, "Cooldowns");