const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'prefix',
    category: 'admin',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args.length < 1) {
						const prefix = new MessageEmbed()
						.setTitle(`${message.guild.name}\'s prefix!`)
						.setDescription(`My prefix for you is \`${settings.prefix}\``)
						.setTimestamp(new Date())
						.setColor("GREEN")
						return message.channel.send(prefix).then(m => m.delete({timeout: 10000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });
					const prefixc = new MessageEmbed()
						.setTitle(`${message.guild.name}\'s prefix Changed!`)
						.setDescription(`The prefix is changed as \`${args[0]}\``)
						.setTimestamp(new Date())
						.setColor("RED")
						return message.channel.send(prefixc).then(m => m.delete({timeout: 10000}));
    }
}