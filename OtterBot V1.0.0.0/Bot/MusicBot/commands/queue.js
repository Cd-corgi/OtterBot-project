const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
				const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
			
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        const order = new MessageEmbed()
				.setTitle("Queue")
				.setDescription(`${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n")}`)
				.setFooter(`${status(queue)}`)
				message.channel.send(order)
    }
}