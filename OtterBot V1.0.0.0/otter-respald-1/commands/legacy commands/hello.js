module.exports = {
	name: 'hello',
	category: 'social',
	description: 'introduce the bot',
	usage: '(prefix)hello',
	run: (client, message, args) => {

		let user = message.author;

		message.channel.send(`Hello **${user.username}!** I'm OtterBot! and i am a social bot with pretty usages!`)

	}

}