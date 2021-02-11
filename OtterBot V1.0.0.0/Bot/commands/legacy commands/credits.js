const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
	name: 'credits',
	category: 'credits',
	description: 'give a last credits for users',
	usage: '(prefix)credtis',
	run: async(client, message, args) => {

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
    
                return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return helpMSG(client, message);
        }
    }
	}

	async function helpMSG(client, message) {
    const settings = await Guild.findOne({
        guildID: message.guild.id
    });

	const Main = new MessageEmbed()
	.setTitle('Community Update - Journeys end')
	.setDescription('Thanks for those persons who helped me in make this bot \n i\'m so proud of meself and my friends...')
	.addField('owner', 'Coiny', true)
	.addField('icon & icon remix', 'born icon: Object AU #3064 \n Remix icon: Coiny #6059', true)
	.addField('Special thanks!', 'Pin #5437, Sentrazia #2046, BP #9495, coal #2556, TennisBall #3864, Taco BFB #2763, Object AU #3064 \n ***and the others users who colaborated in help me in this bot in artistic and moodly way!***')
	.setColor("CYAN")
	message.channel.send(Main)
	
}