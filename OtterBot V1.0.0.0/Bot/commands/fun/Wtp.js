const over = require('poke-over') // requerimos el modulo
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: 'wtp',
	category: 'fun',
	description: 'make a little mention to the mistery pokemon',
	usage: '(prefix)wtp',
	run: async(client, message, args) => {
		 over.randomPokemon().then(pokemon => { // se hace un then para resolver la promesa, tambien se puede usar await, pokemon devuelve un json con .name que es el nombre del pokemon y imageURL que es su imagen en png
	const embed = new MessageEmbed() //primer Embed
	.setColor("RANDOM")
	.setTitle("Who's that Pokemon?")
	.setDescription("You have `15 seconds` to reveal who's that pokemon!")
	.setImage(pokemon.imageURL)
	message.channel.send(embed).then(msj => { // se hace un then para poder conseguir el mensaje del bot y poder editarlo
	message.channel.awaitMessages(x => x.content.toLowerCase() === pokemon.name.toLowerCase() && x.author.id === message.author.id, { max: 1, time: 15000, errors: ['time'] }).then(col => { //se hace el awaitMessages que tiene un filtro de que el nombre del pokemon tiene que ser igual al mensaje y la id del autor debe ser igual a la id del autor del comando y de tiempo 15 segundos.
	const embed2 = new MessageEmbed() //el Embed si el autor adivino el Pokemon
	.setColor("GREEN")
	.setTitle("GOT IT! ")
	.setDescription("it's "+pokemon.name)
	.setImage(pokemon.imageURL)
	msj.edit(embed2) // se edita el mensaje del bot al embed de que adivino
       }).catch(col => { //Si no acerto el autor
	const embed3 = new MessageEmbed() //Embed de Fallo
	.setColor("RED")
	.setTitle("Too bad!!")
	.setDescription("Was "+pokemon.name)
	.setImage(pokemon.imageURL)
	msj.edit(embed3) // y se edita el mensaje del bot al de fallo
       })
     })
   })
	}
}