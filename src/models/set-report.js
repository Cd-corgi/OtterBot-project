const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guild: String,
    channelID: String
});

module.exports = mongoose.model( "report", Schema, "Reports" );