const { MessageEmbed } = require('discord.js');
const star = require('star-labs')

module.exports = {
	name: 'hug',
	category: 'fun',
	description: 'give hugs',
	usage: '(prefix)hug <user>',
	run: (client, message, args) => {
		 message.delete()
              let aA = message.author
              let aB = message.mentions.users.first()
              if (!aB) return message.channel.send('ping a user for give a hug.');
              const embed = new MessageEmbed()
                .setDescription(aA.tag + ' gave a hug to ' + aB.tag)
                .setColor('0x800000')
                .setImage(star.hug())
                .setFooter(`action made by **${client.user.username}**`, client.user.displayAvatarURL)
                .setTimestamp();
              message.channel.send({ embed });
	}
}