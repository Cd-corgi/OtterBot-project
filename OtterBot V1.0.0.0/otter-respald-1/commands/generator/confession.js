const { MessageEmbed } = require('discord.js')
const db = require('../../models/confess')

const cooldown = new Set();

module.exports = {
	name: 'confession',
	category: 'generator',
	description: 'send an anonymous or not confession in a setted channel',
	usage: '(prefix)conession <confession> <--n>',
	run: async(client, message, args) => {
		message.delete();
	let palta = await db.findOne({serverID: message.guild.id}) // Buscamos el documento
	let ch = await client.channels.resolve(palta.channelID) // Buscamos el canal
	if(!palta || !ch) return message.reply('Channel not find')  // Si no esta definido o no lo encuentra retorna
	let txt = args.join(' ') // Creamos una variable 
	if(!txt) return message.reply('Insert your confession, if your text ends in "--n" it won\'t be anonym')
	if(txt.includes('discord.gg') || txt.includes('discord.com/invite')) return message.reply('no invites allowed!') // Un poco de seguridad  si tiene una invite retorna

	if(txt.length < 2) return message.channel.send("Your confession is more than 1 letter...");

	if(txt.length > 300) return message.channel.send("please cut and compress your words...");

if(cooldown.has(message.author.id)){
   message.channel.send(message.author.username + " Use this acction in 10 seconds!");
   return;
	}


	message.channel.send('Your confession was sent in the confession channel')
	let tit = txt.endsWith('--n') ? 'Confession made by ' + message.author.tag : 'Unknown Confession'
	
	// Revisamos si termina en --n para ver si es anonima
	const emb = new MessageEmbed()  // Los embeds son pro
	.setTitle(tit) // Titulo
	.setDescription(txt) // Descripcion
	.setColor('RANDOM') // Color
	ch.send(emb)
	
	cooldown.add(message.author.id)
  setTimeout(function(){
    cooldown.delete(message.author.id)
  }, 10000) // Enviamos el embed
	} // Cerramos comando



}



