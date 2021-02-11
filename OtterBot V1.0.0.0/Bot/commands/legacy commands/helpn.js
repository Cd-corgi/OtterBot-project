const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')
const Guild = require('../../models/guild')

module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'legacy commands',
	description: 'new help menu',
	usage: '(prefix)newhelp',
	run: async (client, message, args) => {
		message.delete();
		    if (message.author.bot) return;

		

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

	const prefix = settings.prefix;

	const menu = new MessageEmbed()
	.setTitle(`${client.user.username}\'s menu!`)
	.setThumbnail(client.user.avatarURL())
	.setDescription(`My prefix for this Guild is \`${prefix}\`! \n React to change the page!`)
	.addField("📱 General Commands", "The main commands", true)
	.addField("❤ Funny Commands", "Interactive commands", true)
	.addField("🅿 Utility Commands", "misc commands", true)
	.addField("🤖 MOD Commands", "basic moderation commands", true)
	.addField("📊 About Me", "credits and more", true)
	.addField("❌ Close Menu", "_ _", true)
	.addField(`_ _`, "A coffee make me more happy! press the otter emoji [🦦](https://www.buymeacoffee.com/CorgiOtterBot)")
	.setColor("#00FFE8")

	const Generalc = new MessageEmbed()
	.setTitle("📱 **General Commands**")
	.addField(`\`${prefix}hello\``, 'Let me introduce you in my system!', true)
	.addField(`\`${prefix}join\``, 'I wanna make presence in your server!', true)
	.addField(`\`${prefix}vote\``, 'Support me with your vote in Top.gg!', true)
	.addField(`\`${prefix}weather <city>\``, 'Make sure in see your weather in your city!', true)
	.addField(`\`${prefix}coffee\``, 'What is the secret to being in a great bot? is support the owner of the bot!', true)
	.setFooter("Ping me to know my prefix here!", client.user.avatarURL())
	.setColor("#0070FF")

	const Funnyc = new MessageEmbed()
	.setTitle("❤ **Funny Commands**")
	.addField(`\`${prefix}8ball <question>\``, 'Ask me and i will decide your possible destiny 💡', true)
	.addField(`\`${prefix}boi\``, 'F#!k 2020 all my homies use the :b:oi function', true)
	.addField(`\`${prefix}divorce <user answer yes/no>\``, 'I\'m so sorry for hear that!', true)
	.addField(`\`${prefix}flip\``, '!ynnuf s\'ti ,wonk tnod i', true)
	.addField(`\`${prefix}flipcoin\``, 'A little election about 2 options solved by a coin!', true)
	.addField(`\`${prefix}hug <user>\``, 'Giving hugs is the most cute of things o(〃＾▽＾〃)o', true)
	.addField(`\`${prefix}impostor <user>\``, 'vote a user and decide if that user is an impostor', true)
	.addField(`\`${prefix}kiss <user>\``, 'Kiss your waifu UwU', true)
	.addField(`\`${prefix}kill <user>\``, 'Among us a murderer', true)
	.addField(`\`${prefix}say\``, 'Talk as me, dont overuse my identity!', true)
	.addField(`\`${prefix}rps <r/p/s>\``, 'Figth with me in a little game!', true)
	.addField(`\`${prefix}marry <user answer yes/no>\``, 'propose sommething cute for someone to be a wife/husband!', true)
	.addField(`\`${prefix}ttt <user>\``, 'play with the user mentioned to make a good momment', true)
	.addField(`\`${prefix}wtp\``, 'Make a fast answer trying to type the name of the pokemon!', true)
	.addField(`\`${prefix}pet [user]\``, 'Summon the petting hand for your pfp or a friend!', true)
	.addField(`\`${prefix}simp [user]\``, 'make your own simp card!', true)
	.addField(`\`${prefix}howcute <user>\``, 'Try to show how cute you are or they are!', true)
	.addField(`\`${prefix}ship <user>\``, 'The best ship is amoung us just show it', true)
	.setColor("#F02A0B")

	const Utilityc = new MessageEmbed()
	.setTitle("🅿 **Utility Commands**")
	.addField(`\`${prefix}giveaway <time 1d/h/m/s> <#channel> <prize>\``, 'a simple giveaway for make a react and random selection!', true)
	.addField(`\`${prefix}monster\``, 'a unique pet system with one global slot!', true)
	.addField(`\`${prefix}buy <item>\``, 'require a adopted monster to buy items in the shop!', true)
	.addField(`\`${prefix}dig\``, 'a simple command to claim 100 xp (require monster adopted)!', true)
	.addField(`\`${prefix}rename <new name>\``, 'give a new name for your pet (require a monster adopted)', true)
	.addField(`\`${prefix}use <item>\``, 'use a valid object in your inventory', true)
	.addField(`\`${prefix}shop\``, 'buy items with your coins in the pet system!', true)
	.addField(`\`${prefix}qr <text/link>\``, 'make a qr code with a custom text or link', true)
	.addField(`\`${prefix}poll <#channel> <topic>\``, 'send a tille poll with a funny topin in voting!', true)
	.setColor("#FFFFFF")
	.addField(`\`${prefix}translate <language> <test>\``, 'translate every word!', true)
	.addField(`\`${prefix}confession <text> <--n to reveal your name>\``, 'make a secret confession about someone or something with your name hide or revealed if you want!', true)
	.addField(`\`${prefix}msupport\``, 'Display the music commands! (only for default prefix!)', true)

	const MODc = new MessageEmbed()
	.setTitle("🤖 **MOD Commands**")
	.addField(`\`${prefix}ban <@user> <reason>\``, 'Ban a user! a good option to put end for a bad user', true)
	.addField(`\`${prefix}warn <@user> <reason>\``, 'Like the Baseball, 3 strikes and OUT!', true)
	.addField(`\`${prefix}warns <user>\``, 'Check them warnings count!', true)
	.addField(`\`${prefix}kick <@user> <reason>\``, 'dont be scared, kick that bad user!', true)
	.addField(`\`${prefix}purge <amount>\``, 'erase messages, i can\'t erase messages over of 14 days!', true)
	.addField(`\`${prefix}prefix <new prefix>\``, 'Change the prefix in your guild!', true)
	.addField(`\`${prefix}dw <user>\``, 'Clear the blacklist of the warns for a user!', true)
	.addField(`\`${prefix}selfroles <add/remove/join/leave/list> <name/role>\``, 'make sure in add a list of the roles to choose! (beta)', true)
	.addField(`\`${prefix}welcome <#channel>\``, 'set the welcome channel to send the grettings to the new users coming!', true)
	.addField(`\`${prefix}userinfo <user>\``, 'check about the user', true)
	.addField(`\`${prefix}serverinfo\``, 'check about the server!', true)
	.addField(`\`${prefix}set-confession <#channel>\``, 'set your confessions inbox channel!', true)


	const Credits = new MessageEmbed()
	.setTitle("📊 **About me**")
	.setDescription("i'm a little but funny social bot with great functions! and my goal in this social media is being in a friendly otter for you (◌◠ ◡ ◠◌)")
	.addField("**Owner**", `<@451471780977311745>`, true)
	.addField("**My sites**", "[😺 Cd-corgi | GitHub](https://github.com/Cd-corgi/otterbot-0-1-2-7b) |  [☁ OtterBot | Top.gg](https://top.gg/bot/686245252717477966) | [📷 @OtterBot_chat](https://www.instagram.com/otterbot_chat/)")
	.addField("**Special Thanks**", `<@623054320207790080>, <@697544823208542208>, <@634733934361444382>, <@721208659136217090>, \n and my very special person.. <@539283901441376281>`) 
	.setColor("#45E721")
	.setImage("https://media.giphy.com/media/l1IBiCKmfD2bRmHcI/giphy.gif")
	.setFooter("Thanks for join this happy Otter! |", client.user.avatarURL())

	message.channel.send(menu).then(msg => { //Las reacciones
      msg.react('📱')
      msg.react('💖')
      msg.react('🅿')
      msg.react('🤖')
      msg.react('📊')
      msg.react('⏪')
			msg.react('❌')
      msg.awaitReactions((reaction, user) => { //Lo que hara el primer emoji afectara al primer embed
        if (message.author.id !== user.id) return;
        if (reaction.emoji.name === '📱') {
          msg.edit(Generalc)
        }
        if (reaction.emoji.name === '💖') { //Lo que hara el segundo emoji afectara al segundo embed
          msg.edit(Funnyc)
        }
        if (reaction.emoji.name === '🅿') {//El tercer emoji afectara al tercer embed
          msg.edit(Utilityc)
        }
        if (reaction.emoji.name === '🤖') {//El tercer emoji afectara al tercer embed
          msg.edit(MODc)
        }
        if (reaction.emoji.name === '📊') {//El tercer emoji afectara al tercer embed
          msg.edit(Credits)
        }
        if (reaction.emoji.name === '⏪') {//El tercer emoji afectara al tercer embed
          msg.edit(menu)
        }
				if (reaction.emoji.name === '❌') {

					msg.delete()
				}
				
      })
    });
}



	}
