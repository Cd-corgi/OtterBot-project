const db = require('megadb');
const db_marry = new db.crearDB("marry");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
	name: 'marry',
	category: 'fun',
	description: 'propose a user to be a wife/husband',
	usage: '(prefix)marry <user> yes/no',
	run: (client, message, args) => {
		const usuario = message.mentions.users.first() ||  client.users.cache.get(args[0]);// Hacemos que la persona la que quiera proponer matrimonio pueda mencionar o poner una ID

    if (!usuario) return message.channel.send("Mention someone to get married") // Si la persona no menciona o pone ID de un usuario valido enviara este mensaje.

		if (usuario === message.author) return message.channel.send("Asexual? no problem")

    if(db_marry.tiene(usuario.id)) return message.channel.send("This user are already married with another user! sorry bro/sister") // Envia este mensaje si la persona que mencionan ya esta casada.

    if(db_marry.tiene(message.author.id)) return message.channel.send("<a:admin:706359845158387713> You\'re already married with someone... ~~cheater~~") // Envia este mensaje si la persona que propone matrimonio esta casada.
    
    message.channel.send(`${usuario} do you accept ${message.author} as your legith wife/husband?`) // Envia el mensaje para proponer matrimonio a la persona.

    const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 30000}); // Ponemos que tiene 3 segundos para poder responder a este mensaje.
    
    collector.on("collect", collected => { 
    if (collected.content.toLowerCase() === "yes"){ 
        message.channel.send("As a social bot and weedings admin i declare us as waifu and husbando kiss it the husbando UwU.") // Envia este mensaje si la respuesta de la persona que mencionaron es "yes"
        db_marry.establecer(message.author.id, {id: usuario.id, tag: usuario.username}) /
        db_marry.establecer(usuario.id, {id: message.author.id, tag: message.author.username}) // Enviamos esto a la base de datos.
        
    } else if (collected.content.toLowerCase() === "no"){ 
        message.channel.send("sorry husband/wife this wedding is over... try with another person!") // Si la respuesta es no enviara este mensaje.
    }
});

collector.on("end", collected => { 
    if (collected.size === 0) return message.channel.send("I\'m so sorry for u user... but the gf/bf dont came at the agreed time to get the weeding... so we declare this ceremony as a... cancelled by delay from the husband or wife :rolling_eyes:"); // Si la persona no responde en los 3 segundos de espera, enviara esta respuesta.
      });
	} 
}