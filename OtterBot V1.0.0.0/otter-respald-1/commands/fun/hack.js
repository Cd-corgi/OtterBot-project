const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'hack',
	category: 'fun',
	description: 'make a fake hacking',
	usage: '(prefix)hack <user>',
	run: (client, message, args) => {

		let bot = client.user.username;
		let icon = client.user.avatarURL();

		let ipn = `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`;
		
		let user =  message.author; 
		

		let tags = ['Pewdiepew', 'Coiny', 'Brazzers\' bald man', 'ice age\'s baby', user]
		let ips = ipn
		let email = ['tattomerch23@gmail.com', 'bmanhot@brazzers.com', 'icecave@dreamworks.es', 'tseries.off@gmail.com']
		let pass = ['PoP7j9866YPo', '8ohbNNnCHG19', '1LQhCtYShxQk', 'atmwjFWNjtdk', 'i5THAIjoJfWi']

		const hacked = new MessageEmbed()
		.setTitle("Hack operations 🖥")
		.setThumbnail(icon)
		.setDescription('Those data are sent to the database! and for recue this data you should pay 23K Vbucks to rescue the user!')
		.setTimestamp()
		.addField(`Victim:`, tags[Math.floor(Math.random() * tags.length)], true)
		.addField("IPS ADDRESS", `${ips}`,true)
		.addField('Email', email[Math.floor(Math.random() * email.length)], true)
		.addField('**Password**', `||${pass[Math.floor(Math.random() * pass.length)]}||`)
		.setFooter('OtterBot', client.user.avatarURL())

		
		message.channel.send(hacked)


	}
}