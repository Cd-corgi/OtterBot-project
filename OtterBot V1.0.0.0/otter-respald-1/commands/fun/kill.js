const { MessageEmbed } = require('discord.js');
const star = require('star-labs')

module.exports = {
	name: 'kill',
	category: 'fun',
	description: 'kill users',
	usage: '(prefix)kill <user>',
	run: (client, message, args) => {
		 message.delete()
              let aA = message.author
              let aB = message.mentions.users.first()
              if (!aB) return message.channel.send('ping a user for kill.');
             if(aB === aA) return message.channel.send('You can\'t kill youself, weird...')
  
							const coin =
							['https://media.giphy.com/media/eiSMaA4QZjRuoWebHU/giphy.gif',
							'https://media.giphy.com/media/fTshcUh8725jMo8pk4/giphy.gif',
							'https://media.giphy.com/media/UVNDNxVqhl8UsHzJ3e/giphy.gif',
							'https://media.giphy.com/media/d96cYD2gOe8yjgSrmb/giphy.gif'];

 const embed = new MessageEmbed()
  .setAuthor(aA.tag + " Kills " + aB.tag)
  .setImage(coin[Math.floor(coin.length * Math.random())])
  .setColor("RANDOM")

 message.channel.send(embed);
	}
}