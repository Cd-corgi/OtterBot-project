const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {

				const paused = new MessageEmbed()
				.setTitle("⏸ | Wait a minute!")
				.setDescription("Someone Paused the queue!")
				.setColor("#3BDAD7")

				const resumed = new MessageEmbed()
				.setTitle("▶ | Continue the party")
				.setDescription("Someone Resume the song!")
				.setColor("#3BDA77")

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❓ | There is nothing in the queue right now!`)
        if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send(resumed)
        }
        client.distube.pause(message)
        message.channel.send(paused)
    }
}