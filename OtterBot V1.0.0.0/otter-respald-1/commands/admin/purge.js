const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'purge',
	category: 'admin',
	description: 'can delete message under 14 days old',
	usage: '(prefix)purge <amount of messages>',
	run: (client, message, args) => {
		var permisos = message.member.hasPermission("MANAGE_MESSAGES");


		if (!permisos) { /*Si la persona no tiene los permisos de arriba, enviará este embed*/
    const NoPermisos = new MessageEmbed()
    .setAuthor(message.author.username)
		.setDescription("MISSING PERMISSIONS!") 
		.addField("`You cannot do this command. only mods or higher can do this function.`", ":otter:")
    .setColor("BLACK")
     message.channel.send(NoPermisos).then(m => m.delete({timeout: 10000}))
    return NoPermisos /*Retornamos acá*/
                     }
    let cantidad = parseInt(args[0]);

		if(!cantidad) {
			message.channel.send('please specify your number to erase several message')
			return;
		}

		if(cantidad > 100) {
			return message.channel.send(":x: | `My limit to purge the messages is equal or less than 100`").then(msg => {
				msg.delete({timeout: 10000})
			})
		}


    message.channel.bulkDelete(cantidad);
		message.channel.send(':otter: otterlly nice to erase it!').then(m => m.delete({timeout: 5000})).catch(err => {
			message.channel.send(err)
		});

	}
}