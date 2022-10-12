const Nospam = require('../../models/anti-spam')
const Discord = require('discord.js')
const userSpam = new Map();

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (!message.guild) return;

    let spamChannel = await Nospam.findOne({ guildID: message.guild.id });

    if (!spamChannel) return;

    let user = message.author;

    if (!spamChannel.Channels.some(v => v.ChannelID == message.channel.id)) {
        return;
    } else {
        if (userSpam.has(message.author.id)) {
            const userData = userSpam.get(message.author.id);
            let { msgCount } = userData;

            msgCount += 1;

            userData.msgCount = msgCount;
            userSpam.set(message.author.id, userData);

            if (msgCount >= 3) {
                message.delete();
            }

            if (msgCount >= 5) {
                message.delete().catch(err => { });
                message.guild.members.cache.find(m => m.id === user.id).timeout(15 * 60 * 1000, "Spamming messages!")
                const stoo = new Discord.EmbedBuilder()
                    .setTitle(`[ANTI-SPAM] ${user.username} has been muted!`)
                    .setDescription(`Reason: \`Spam\`\nTimeout: \`15 Minutes\``)

                return message.channel.send({
                    embeds: [stoo]
                })
            }

            setTimeout(() => {
                userSpam.delete(message.author.id);
            }, 10000)

        } else {
            userSpam.set(message.author.id, {
                msgCount: 1
            })
            setTimeout(() => {
                userSpam.delete(message.author.id);
            }, 10000)
        }
    }
} //a