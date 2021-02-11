const { MessageEmbed } = require('discord.js')

const db = require('quick.db')

module.exports = {
	name: 'warns',
	category: 'admin',
	description: 'explore yuor strikes!',
	usage: '(prefix)warns <user>',
	run: async (client, message, args) => {
		 message.delete()
				const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

				let target = message.mentions.users.first() || message.author;

        if(warnings === null) warnings = 0;

				const embed = new MessageEmbed()
				.setTitle(`${user.username}\'s warnings list!`)
				.setThumbnail(target.avatarURL(), true)
				.setColor("RED")
				.setDescription(`***${user.username}*** consult your warns and reasons in your respective server, renember, 3 warns = kicked!`)
				.addField(`You have ${warnings} warns...`, `be carefull...`, true)

        message.channel.send(embed).then(msg =>{
					msg.react('❌')
					msg.awaitReactions((reaction, user) => {
						if(message.author.id !== user.id) return;
							if(reaction.emoji.name ==  '❌') {
								msg.delete()
							}


					})
				})
	}
}