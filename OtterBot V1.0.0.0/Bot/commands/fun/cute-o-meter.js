const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'howcute',
	category: 'fun',
	description: 'how cute you are',
	usage: '(prefix)howcute <user>',
	run: async (client, message, args)=> {

		message.delete();

		let number = Math.floor(Math.random() * 100);

		let user = message.mentions.users.first() || message.author;

		let emoji = ""
		let gif = ""

		if(number < 30){// Si el numero es menor que 30
  	emoji =":face_vomiting:";//Nuestro emoji seria una carita vomitando xd
		gif = "https://media.giphy.com/media/g2V8KS4AfwyFq/giphy.gif";

		}else if(number < 40){// Si el numero es menor que 40 
  	emoji =':worryed:';//Nuestro emoji seria una carita seria
		gif = "https://media.giphy.com/media/MCQz2S0usAb17DAHkS/giphy.gif";

		}else if(number < 70){// Si el numero es menor a 70
  	emoji =':open_mouth:';//Nuestro emoji seria una carita sorprendida :o
    gif = "https://media.giphy.com/media/LSiA8wmYOYIaevpS6t/giphy.gif";   

		}else if(number < 95){// Si el numero es menor a 95 
  	emoji =':heart_eyes:';//Nuestro emoji seria una carita con corazones
    gif = "https://media.giphy.com/media/XqPHWAIkmWV0c/giphy.gif";

		}else if(number < 101){// Y si el numero es menor a 101
   	emoji ='😍😘🥰';
		gif = "https://media.giphy.com/media/26xBsMYjG4vBob2rC/giphy.gif"; 
		}

		const cuteometer = new MessageEmbed()
		.setTitle("Cute-o-Meter!")
		.addField(`The user ***${user.username}*** have a percent of...`, `${number}! ${emoji}`)
		.setImage(gif)
		.setColor("RANDOM")

		message.channel.send(cuteometer)

	}
}