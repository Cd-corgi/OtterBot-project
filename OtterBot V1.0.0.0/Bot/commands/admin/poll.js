const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'poll',
	category: 'admin',
	description: 'make a decission with reactions',
	usage: '(prefix)poll <channel> <question>',
	run: async (client, message, args) => {
		message.delete();
	 if(!message.member.hasPermission("MANAGE_CHANNELS", 'SEND_MESSAGES')) return message.channel.send("You have not the permissions to do this!.")//Si el usuario no tiene los permisos MANAGE_CHANNELS y SEND_MESSAGES retorna
      let pollChannel = message.mentions.channels.first();//Hacemos que mencione un canal
      if(!pollChannel) return message.channel.send("Mention a channel!")//Si no menciona el canal retorna
        let pollDescription = args.slice(1).join(' ');//Hacemos que coloque el contenido del mensaje como descripcion
       if(!pollDescription) return message.channel.send("Give a reazon to make the poll")//Si no especifica la descripcion retorna

        let embedPoll = new MessageEmbed()//Creamos un embed
        .setTitle('New Poll!')//Titulo de la encuesta
        .setDescription(pollDescription)//La descripcion
        .setColor('RANDOM')//Colocamos un color, o colocamos RANDOM Para que sea al azar
        pollChannel.send(embedPoll).then(async m => {//Enviamos embed
          await m.react("✔")//AÃ±adimos la reacciones esta es la de Si
           await m.react("❌") //Y esta la de No
            })}

	}
