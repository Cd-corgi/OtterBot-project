const { MessageAttachment } = require('discord.js')

module.exports = {
	name: 'simp',
	category: 'fun',
	description: 'simp',
	usage: '(prefix)simp [user]',
	run: async(client, message, args) => {
		message.delete();
		let user = message.mentions.members.first() || message.author;

		let image_simp = new MessageAttachment(`https://api.no-api-key.com/api/v2/simpcard?image=${user.avatarURL({ format: "png" })}`, 'simp.png')

		message.channel.send(image_simp)
	}
}