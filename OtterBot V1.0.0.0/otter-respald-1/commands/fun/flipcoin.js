const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'flipcoin',
	category: 'fun',
	description: 'flip randomly a coin and chooce your fast dessicion',
	usage: '(prefix)flipcoin',
	run: (client, message, args) => {
	const coin =
	['https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png',
	'https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png'];

 const embed = new MessageEmbed()
  .setAuthor(message.author.username + " U got:", message.author.avatarURL)
  .setImage(coin[Math.floor(coin.length * Math.random())])
  .setColor("RANDOM")

 message.channel.send(embed);
	}
}