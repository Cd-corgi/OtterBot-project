const { MessageEmbed } = require('discord.js')
const db = require('megadb')
const db_report = new db.crearDB('reports')

module.exports = {
	name: 'report',
	category: 'generator',
	run: async(client, message, args) => {
		
		let user = message.author;
		let rServer = message.guild;
		let nserver = "688860273225760829";

		let logchannel = await db_report.obtener(`${nserver}.report_channel`);

		let reason = args.slice(0).join(" ");

		if(!args[0]) {
			const help = new MessageEmbed()
			.setTitle("How use this command!")
			.setDescription("(prefix)report [reason of the report!]")
			.setFooter("`<> optional []required | NO SPAM/SPONSOR LINKS`")
			.setColor("GREEN")

			message.channel.send(help)
			return;
		}

		if(reason.length < 2) return message.channel.send("`please write the reason a bit longer`")

		if(reason.includes('discord.gg') || reason.includes('discord.com/invite') || reason.includes('bit.ly') || reason.includes('youtube.com')) return message.reply('no links allowed!')

		message.channel.send('your report was posted in the Owner\'s queue')

		const reportLog = new MessageEmbed()
		.setTitle("Bug Report!")
		.setColor("RANDOM")
		.addField("From the server:", `${rServer.name}`, true)
		.addField("Report Author", `${user.username}`, true)
		.addField("Reason of the report", `${reason}`)

		nserver.send(reportLog)
	}
}