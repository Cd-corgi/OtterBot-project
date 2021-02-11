const  {MessageAttachment } = require('discord.js')

module.exports = {
	name: 'pet',
	category: 'fun',
	description: 'make a pet for yourr pfp',
	run: async(client, message, args) => {
		 const pet = require("pet-pet-gif")

		 message.delete();

		 const user = message.mentions.users.first() || message.author;

//aquí lo requerimos como pet
    
    let animatedGif = await pet(user.displayAvatarURL({format: "png"}))
/*Aquí comenzamos, creamos una variable y usaremos el await para usar el modulo, dentro usaremos nuestro usuario y en el formato "png" 
*/
   
//ahora creamos un message attachment y lo enviamos como gif
    const petpet = new MessageAttachment(animatedGif, "petpet.gif") 
    
    message.channel.send(petpet)
	}
}