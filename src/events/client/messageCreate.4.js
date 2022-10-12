const scam = require('../../config/scam.json')
const Discord = require('discord.js')

module.exports = async (client, message) => {

    if (!message.guild || message.channel.type === "dm") return;

    if (message.author.bot) return;

    for (const bad of scam) {
        if (message.content.includes(bad)) {
            if (message.content.includes("discord.gg") || message.content.includes("twitch.tv") || message.content.includes("youtube.com")) return;
            message.delete().catch(err => { });
            let embed = new Discord.EmbedBuilder()
                .setTitle("[:x: ANTI-SCAM] - NO SCAM LINKS")
                .setColor("Red")
            message.author.send({
                embeds: [embed]
            })
        }
    }
}