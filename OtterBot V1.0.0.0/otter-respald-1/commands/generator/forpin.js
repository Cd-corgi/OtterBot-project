const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'gift',
	category: 'generator',
	description: 'a little gift for pin!',
	usage: '(prefix)gift',
	run: async(client, message, args) => {
		message.delete();

		let pin = '<@539283901441376281>'
		let coiny = '<@451471780977311745>'

		const nope = new MessageEmbed()
		.setDescription('please this command is for only one person!')
		.setFooter('Secret Command 1/20')
		.setTimestamp()
		.setColor('RANDOM')

		if(message.author.id !== "539283901441376281") return message.channel.send(nope)
		const forpin = new MessageEmbed()
		.setTitle(`For ${message.author.username}...`)
		.setDescription('This is your gift for x-mas! \n Since our frist day of friends and became a ship... i always was fell in love with your art, your talent, your personality... A unique person who have those cuteness of skills, is you... \n since the first gift for me... i discovered something cute for us... and i always tried to make yuo smile... even thats works a lot of times... those sad momments no only me suffer... our friends suffer too... \n But my gift for you is not material... because our gift each other is... i love you. yeah, even i still with art block... i can make this exclusive command for you <3 Pin... i wish you a cute X-mas and tell you how i love you so much my sweetheart and my dreamed girl! do not gave up! Att: Coiny! ')
		.setFooter('You always being my perfect girl... | X-Mas gift for pin!')

		message.channel.send(forpin)
	}
}