const { MessageEmbed } = require('discord.js')
const randomPuppy = require('random-puppy')

module.exports = {
	name: 'boi',
	category: 'fun',
	description: 'send random memes from reddit',
	usage: '(prefix)boi',
	run: async (client, message, args) => {
		message.delete()
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
  
        const img = await randomPuppy(random);
  
        const memeEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Your meme. and my reason for be urs hommies! From r/${random}`)
        .setURL(`https://www.reddit.com/r/funny/${random}`)
  
        message.channel.send(memeEmbed);
	}
}