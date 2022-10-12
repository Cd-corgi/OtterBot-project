const mongoose = require('mongoose')

let rr = new mongoose.Schema({
    name: String,
    guild: String,
    msg: String,
    roles: [{
        role: String,
        emoji: String
    }]
});

module.exports = mongoose.model('reaction', rr, 'Reaction Roles');