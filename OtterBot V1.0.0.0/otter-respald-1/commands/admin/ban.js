const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	category: 'admin',
	description: 'can ban users',
	usage: '(prefix)ban <user> <reason>',
	run: (client, message, args) => {
		let perms = message.member.hasPermission("BAN_MEMBERS");
	let member = message.mentions.members.first() || message.guild.members.resolve(args[0]) 

	if(!member) return message.channel.send("`mention a user please`") 

	if(!perms) {
		const Nop = new MessageEmbed()
		.setAuthor(message.author.username)
		.setColor("RED")
		.setDescription("`YOU HAVE NOT PERMISSIONS TO DO THIS COMMAND`")
		message.channel.send(Nop)
		return Nop
	}


	let reason = args.slice(2).join(' ');	

	if(!reason) reason = "`WITH NO REASONS`"

	message.guild.members.ban(member, {reason: reason});
	const banned = new MessageEmbed()
	.setTitle(`${member.user.username} WAS BANNED BY ${message.author.username}`)
	.setDescription(`Reason: **${reason}** \n The user banned was sent a dm from me with the report! and notice him/her/they about this`)
	.setColor("CYAN")
	.setImage("https://media.giphy.com/media/H99r2HtnYs492/giphy.gif")
  
	message.channel.send(banned)

	member.send(`Sorry was banned from **${message.guild.name}** by ${reason} \n thats mean: \n you can\'t join in the server again!, sorry!`)
	}
}