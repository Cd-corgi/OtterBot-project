const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
				const resumed = new MessageEmbed()
				.setTitle("▶ | Continue the party")
				.setDescription("Someone Resume the song!")
				.setColor("#3BDA77")

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❓ | There is nothing in the queue right now!`)

        client.distube.resume(message)
        message.channel.send(resumed)
    }
}