const { MessageEmbed, MessageAttachment } = require('discord.js');

const QRCode = require('qrcode');

module.exports = {
	name: 'qr',
	category: 'generator',
	description: 'make a qr with links or text',
	usage: '(prefix)qr <link/text>',
	run: async (client, message, args) => {
		message.delete();
	let text = args.join(" ");
	if(!text) {
  return message.channel.send("specify your text.");
	}

	let image = await QRCode.toBuffer(text)

	let lol = "please wait ...";

	message.channel.send(lol).then(msg => {
		msg.delete({timeout: 10000})
	})

	message.channel.startTyping();

	setTimeout(function() {
		message.channel.send(new MessageAttachment(image, "qrcode.png"))
		message.channel.stopTyping();
	}, 10000)


    
	/*let pleaseWait = await message.channel.send("please wait...");
        
	let embed = new MessageEmbed()
	.setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
	.setColor('GREEN');

	message.channel.send(embed).then(() => pleaseWait.delete());*/
	}
}