const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'mute',
	category: 'admin',
	description: 'mute a user',
	usage: '(pretix)mute <user> <reason>',
	run: async(client, message, args) => {

		let perms = message.member.hasPermission("MANAGE_ROLES");

		if(!perms) {
			const no = new MessageEmbed()
			.setAuthor(message.author.username)
			.setDescription(':x: | You have not permissions')
			.setColor("RED")

			return message.channel.send(no).then(msg => {
				msg.delete({ timeout: 10000 })
			})
		}
		
		let member = message.mentions.members.first();

		if(!member) {
			const userleft = new MessageEmbed()
			.setTitle('Lefting things')
			.setDescription(':x: | mention a user to apply the mute')
			.setColor("ORANGE")

			return message.channel.send(userleft).then(m => {
				m.delete({timeout: 10000})
			})
		}

		let role = message.guild.roles.cache.find(x => x.name === "Muted");

		if(!role){ 
			const roleleft = new MessageEmbed()
			.setTitle('Lefting things')
			.setDescription(':x: | the role cannot be finded')
			.setColor("ORANGE")
			return message.channel.send(roleleft).then(msg => {
				msg.delete({ timeout: 10000 })
			})
		}

		let reason = args.slice(1).join(' ');

		if(reason.length < 1) reason = '`undefinied`'

		if(member.id === message.author.id) {
			const a = new MessageEmbed()
			.setAuthor(message.author.username)
			.setDescription(':x: | You can\'t mute youself!')
			.setColor("RED")

			return message.channel.send(a)
		} 


		member.roles.add(role);

		const success = new MessageEmbed()
		.setTitle('🔇 | Mute Action')
		.addField("**Author:**", `${message.author.username}`, true)
		.addField("Muted User", `${member.user.username}`, true)
		.addField("Following Reasons: ", `${reason}`)
		.setColor("GREEN")
		message.channel.send(success).then(msg => {
			msg.delete({timeout: 10000})
		})

		member.send(`Hello! Shamelly tell you was **Muted** in ${message.guild.name} \n With the following reason: ***${reason}***`)



	}
}