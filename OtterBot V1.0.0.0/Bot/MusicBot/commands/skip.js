const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        try {
            client.distube.skip(message)
						const skiped = new MessageEmbed()
						.setTitle("⏩ | Skiped")
						.setDescription(`Next song in the queue: \`${queue.songs[1].name}\``)
						.setColor("ORANGE")
            message.channel.send(skiped) 
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}