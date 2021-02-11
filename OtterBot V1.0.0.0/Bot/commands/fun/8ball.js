const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
	name: '8ball',
	category: 'fun',
	description: 'ask the bot and make you a random answer',
	usage: '(prefix)8ball <your question>',
	run: async (client, message, args) => {

		message.delete();
		 let respuesta = ["Yeah", "No", "Maybe", "Obvious", "I said Yes", "I said No", "Probably"]
  	 var random = respuesta[Math.floor(Math.random() * respuesta.length)]
		 const embed = new MessageEmbed()
			.addField("Your Question", `${args.join(" ")}`)
			.addField("My answer is:", `${random}`)
			.setColor("RANDOM")
		 message.channel.send(embed)


	}

}

