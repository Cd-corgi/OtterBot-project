const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'presence',
	category: 'generator',
	description: 'where i am joined currently',
	usage: '(prefix)precense',
	run: async(client, message, args) => {
		const prencese = new MessageEmbed()
		.setTitle(`My Servers Presence!`)
		.addField("**My server count!**", `<:botonline:746622005855387738> ${client.guilds.cache.size} Servers!`, true)
		.addField("**My users count!**", `<:streaming:313956277132853248> ${client.users.cache.size} Users!`)
		.setFooter("OtterBot", client.user.avatarURL())

		message.channel.send(prencese) 
		 
	}
}