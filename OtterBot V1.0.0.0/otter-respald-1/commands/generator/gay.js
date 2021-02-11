const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'gay',
	category: 'generator',
	description: 'making a rainbow layer over your pfp',
	usage: '(prefix)gay',
	run: async(client, message, args) => {
		let persona = message.mentions.users.first(); //detectara al mencionado, yo lo defini como persona
  if (!persona) persona = message.author; //nos dara esto
  let link = `https://api.alexflipnote.dev/filter/gay?image=${persona.displayAvatarURL({ format: "png" })}`; //este es un link que le dara el fondo a la imagen, y lo defini como link xd

  let embed = new MessageEmbed() //definimos el embed o solo ponen asi xd, aqui sera embed v12
      .setImage(link) //mandara nuestro avatar mas la imagen de un arcoiris que simula lo de gay
      .setColor("RANDOM") //color, yo lo puse random
  message.channel.send(embed)

	}
}