const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {

				const stopped = new MessageEmbed()
				.setTitle("⏏ | As you want, Music Stopped!")
				.setThumbnail("https://media.giphy.com/media/3o7TKW7cknfhthVPfG/giphy.gif")


        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❓ | There is nothing in the queue right now!`)
        client.distube.stop(message)
        message.channel.send(stopped)
    }
}