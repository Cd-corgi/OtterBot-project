const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
	name: 'join',
	category: 'invite bot',
	description: 'inviting my bot make me happy',
	usage: '(prefix)join',
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
	
	message.delete();

	message.channel.send({
   embed: {
   color: 3447003,
   author: {
   name: client.user.username,
   icon_url: client.user.avatarURL()
     },
   title: "Join me in ur server!",
   url: "https://discord.com/api/oauth2/authorize?client_id=686245252717477966&permissions=8&scope=bot",
   description: "Feel about the calm and the basic social functions",
   fields: [{
   name: "`press the blue words`",
   value: "just try chat with the system."
     }  
       ],
           timestamp: new Date(),
             footer: {
             icon_url: client.user.avatarURL(),
             text: "OtterBot"
         }
       }
     }); 

}
