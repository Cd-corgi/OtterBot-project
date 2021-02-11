const db = require('../../models/confess')

module.exports = {
	name: 'set-confession',
	category: 'admin',
	description: 'make set the channel where the confession section is active',
	usage: '(prefix)set-confession <#channel>',
	run: async(client, message, args) => {

	if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You can\'t do this command') // Si no tiene admin devuelve
	if(!args[0]) return message.reply('You Should mention a channel') // Si no hay args devuelve un mensaje
	let ch = message.mentions.channels.first() || message.guild.channels.resolve(args[0])
	if(!ch) return message.reply('You Should mention a channel') // Si no hay canal devuelve un mensaje
	let palta = await db.findOne({serverID: message.guild.id}) // Buscamos un documento
		if(palta) { // Si se encuentra
	palta.updateOne({channelID: ch.id}) // Actualizamos
	await palta.save() // Guardamos
	return message.reply('The recent data is Updated!') // Enviamos un mensaje
	} // Cerramos condicion
	let luck = await new db({serverID: message.guild.id, channelID: ch.id }) // Creamos un nuevo documento
		await luck.save() // Guardamos
	return message.reply('The recent data is Updated!') // Enviamos un mensaje 
} // Cerramos el comando

	}
