const { MessageEmbed } = require('discord.js')
const db = require('megadb')
const db_report = new db.crearDB('reports')

module.exports = {
	name: 'set-report',
	category: 'admin',
	run: async(client, message, args) => {

		let owner = "451471780977311745";

		let channel = message.mentions.channels.first();

		if(message.author.id !== owner) return message.channel.send("`This is only to the OtterBot's owner! secret 3/20`")

		if(!channel) {
			if(args[0] === 'clear') {
				db_report.eliminar(`${message.guild.id}`)
				message.channel.send("the channel was removed!")
				return;
			}
			message.channel.send("mention a channel to set it as bug reports!")
			return;
		} 

		if(db_report.tiene(`${message.guild.id}`)) return message.channel.send("We can\'t add more channels as report logs")

		



		message.channel.send("Setting up...").then(msg => {
			msg.delete({timeout: 10000})
		})

		setTimeout(function() {
			db_report.establecer(`${message.guild.id}-report_channel`, channel.id, "-")
			message.channel.send(`\`The channel ${channel} was added as bug reports!\``)
		}, 10000)
	}
}