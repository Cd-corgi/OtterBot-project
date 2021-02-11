const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'clyde',
	category: 'fun',
	description: 'alpha commands',
	usage: '(prefix)clyde <text>',
	run: async(client, message, args) => {
	
		//Definiremos args, solamente si no estaba definido antes, obviamente...

	message.delete() //Esto hara que borre lo que escribimos, asi nadie sabra quien lo escribio, es opcional.

	let mensaje = args.join('%20'); //Esto hara que cada espacio de la oracion se cambie a %20, no lo cambies, o sino no funciona.
	let api = `https://ctk-api.herokuapp.com/clyde/${mensaje}`//Aca pondremos la API que usaremos, tampoco lo cambien o sino no funciona.

	const Aceptenmeloplis = new MessageEmbed() //Definimos el embed.
	.setImage(api)//Haremos que mande una imagen, lo cual sera la api con el texto.
	.setColor('RANDOM')//Definimos el color del embed (opcional)

	message.channel.send(Aceptenmeloplis);
	}
}