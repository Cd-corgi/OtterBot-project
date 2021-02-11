const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
	name: 'warn',
	category: 'admin',
	description: 'give a strike to a user',
	usage: '(prefix)warn <user> <reason>',
	run: async (client, message, args) => {
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
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

        if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3) {
					message.guild.member(user).kick(reason);
					const kembed = new MessageEmbed()
					.setTitle(`${user.username} Reached the 3rd Warn!`)
					.setDescription("this user was reached the limit of warns to get the insta-kick from this server")
					.addField("i hope in this case dont happend again!")
					message.channel.send(kembed)
					db.delete(`warnings_${message.guild.id}_${user.id}`);
				}

				if(warnings === 3) {
					 user.send('```you has been kicked by reach the 3rd warn... \n it seems that you did not abide by the rules, of the servers and it seems that i had no other way to remove you by order of the moders, please avoid creating clutter on the the server again, or if not... unfortunately i have the obligation to ban you... \n Att: OtterBot~```')

				}

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }
	}
}