const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'flip',
	category: 'fun',
	description: 'flip every word lol',
	usage: '(prefix)flip <text>',
	run: (client, message, args) => {
			message.delete()
  let embed = new MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL())
  .setDescription("**usage:** __`ottr.flip <message>`__")
  .setColor("RANDOM")
  
   if(!args[0]) return message.channel.send(embed);
const reverse = args.join(" ").split("").reverse().join("");
    message.channel.send(reverse)

	}
}