const Discord = require('discord.js')
const noWords = require('../../models/anti-words')

module.exports = async (client, message) => {
    if(message.author.bot || !message.guild) return;

    let pal = await noWords.findOne({ guildID: message.guild.id })

    if(!pal) return;

    pal.words.forEach(async (w) => {
        if(message.content.toLowerCase().includes(w.word.toLowerCase())) {
            message.delete()
            message.channel.send({ content: `${message.author.username}, no Blacklisted Words`, ephemeral: true }).then((msg) => setTimeout(() => msg.delete(), 5000))
            return;
        }
    })
}