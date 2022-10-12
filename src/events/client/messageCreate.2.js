const Perspective = require('perspective-api-client')
const Discord = require('discord.js')
const toxic = require('../../models/toxic')
const { API } = require('../../config/config.json')
module.exports = async (client, message) => {
    if (message.author.bot) return;

    let user = message.author;

    let tguild = await toxic.findOne({ guildID: message.guild.id })

    if (!tguild) return;
    try {
        const perspective = new Perspective({ apiKey: API })
        const result = await perspective.analyze(message.content).catch(e => { });
        let obj = JSON.parse(JSON.stringify(result))
        let numR = `${parseInt(obj.attributeScores.TOXICITY.summaryScore.value * 100)}`
        var round = Math.ceil(numR)
        let customText = `${tguild.Msg}`;
        var pal = {
            Guild: `${message.guild.name}`,
            User: `${message.author.username}`
        }
        if (round >= 85) {
            try {
                message.delete().catch(err => { });
                user.send({
                    content: `${customText.replace(/Guild|User/gi, function (matched) { return pal[matched] })}`,
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`💬 Anti-Toxic System`)
                            .setColor("Random")
                            .setDescription(`Your message got deleted by a high percentage of toxicity!`)
                            .addFields({ name: "Your Deleted Message", value: `${message.content}`, inline: true})
                    ]
            })
        } catch (e) {
            console.log(e)
        }
    }
    } catch (e) { }
}