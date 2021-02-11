const mongoose = require('mongoose');
const Guild = require('../models/guild');
const { MessageEmbed } = require('discord.js')

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: process.env.PREFIX
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!');

		

};