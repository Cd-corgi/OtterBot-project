const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	category: 'admin',
	description: 'allow kick members',
	usage: '(prefix)kick <user> <reason>',
	run: (client, message, args) => {
		let mencionado = message.mentions.users.first();
	let razon = args.slice(1).join(' ');
	var permisos = message.member.hasPermission("KICK_MEMBERS");


 if (!permisos) { /*Si la persona no tiene los permisos de arriba, enviará este embed*/
    const NoPermisos = new MessageEmbed()
    .setAuthor(message.author.username)
		.setDescription("MISSING PERMISSIONS!") 
		.addField("`You cannot do this command. only mods or higher can do this function.`", ":otter:")
    .setColor("BLACK")
     message.channel.send(NoPermisos).then(m => m.delete({timeout: 10000}))
    return NoPermisos /*Retornamos acá*/
 }

	if(!mencionado) return message.reply(`please mention someone to apply the kick.`);
	if(!razon) return message.channel.send(`write the reason`);

	message.guild.member(mencionado).kick(razon);
	const embed = new MessageEmbed()
	.setTitle(`${mencionado.username} was kicked by ${message.author.username}`)
	.setDescription(`reason: ${razon}`)
	.setColor("BLACK")
	message.channel.send(embed)
	mencionado.send(`was kicked from ***${message.guild.name}*** by **${razon}**... ~~sorry~~`)
	}
}