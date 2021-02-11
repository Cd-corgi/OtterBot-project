const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'vote',
	category: 'support',
	description: 'vote and support otterbot',
	usage: '(prefix)vote',
	run: (client, message, args) => {
		 message.channel.send({embed: {
      color: 3447003,
      author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
      },
      title: "Vote me!",
      description: "make me show in the users eyes to be a good bot in top.gg and Discord Bots",
      fields: [{
          name: "Vote in Top.gg",
          value: "[Here Top.gg](https://top.gg/bot/686245252717477966)"
        },
        {
          name: "Discord Bots invite!",
          value: "[Here in Discord Bots.gg](https://discord.bots.gg/bots/686245252717477966)"
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
				text: "OtterBot",
      }
    }
	});
	}
}