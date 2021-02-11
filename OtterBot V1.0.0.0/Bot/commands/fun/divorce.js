const db = require('megadb');
const db_marry = new db.crearDB("marry");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
	name: 'divorce',
	category: 'fun',
	description: 'propose the end of the ship for your wife/husband',
	usage: '(prefix)marry <user> yes/no',
	run: (client, message, args) => { 

		let usuario = message.mentions.users.first() || client.user.cache.get(args[0]);

if(!usuario) return message.reply('mention your wife/husband to start the divorce...')

 if(!db_marry.tiene(usuario.id)) return message.channel.send("This user have not a wife/husband...") // Envia este mensaje si la persona que mencionan ya esta casada.

 if(!db_marry.tiene(message.author.id)) return message.channel.send("<a:admin:706359845158387713> You cant propose divorce with a external couple homebraker!.") // Envia este mensaje si la persona que propone matrimonio esta casada.

     message.channel.send(`${usuario} do you wanna divorce ${message.author} and end the relationship?`) // Envia el mensaje para proponer matrimonio a la persona.

    const collector = message.channel.createMessageCollector(m => m.author.id === usuario.id && m.channel.id === message.channel.id, {time : 30000}); // Ponemos que tiene 3 segundos para poder responder a este mensaje.
    
    collector.on("collect", collected => { 
    if (collected.content.toLowerCase() === "yes"){ 
        message.channel.send(`You ${message.author} putted end the ${usuario}\'s love and make divorce.. and now you and that user should make a different road now!`) // Envia este mensaje si la respuesta de la persona que mencionaron es "yes"
        db_marry.delete(message.author.id) /
        db_marry.delete(usuario.id) // Enviamos esto a la base de datos.
        
    } else if (collected.content.toLowerCase() === "no"){ 
        message.channel.send(`wow ${usuario}, you should solve this problem with a marryes manager or a therapist, are you agreed ${message.author}?`) // Si la respuesta es no enviara este mensaje.
    }
});

collector.on("end", collected => { 
    if (collected.size === 0) return message.channel.send("how us know i have not the enough time to wait that choice, please think about that..."); // Si la persona no responde en los 3 segundos de espera, enviara esta respuesta.
      });

		
		}

	}