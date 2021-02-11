const Discord = require('discord.js');

//Requerir el archivo que crearon
const MessageModel = require('../../models/selfroles');

module.exports = {
	name: 'selfroles',
	category: 'admin',
	description: 'make a selfrole list',
	usage: '(prefix)selfroles <add/remove/leave/join> <@role> <name>',
  run: async (client, message, args) => {
    //Obviamente esto no funciona en otros lados que no sean un servidor
    if (!message.guild) return message.channel.send('This command only works on servers.')
      if (!args[0]) return message.channel.send('You haven\'t said anything. The options are `join`, `leave`, `list`. For interact with the database: `add`, `remove`')

      //Digamos que queremos ver la lista
      if (args[0] === 'list') {
        
        //Buscamos los documentos, esto devuelve array
        let msgDocument = await MessageModel.find({ guildid: message.guild.id }, "word");

        //El index 0 deberÃÂ­a estar....
        if (msgDocument[0]) {
          let text = "";
          var i = 1;
          for (const selfroles of Object.values(msgDocument)) {
            text += i + ". " + selfroles.word + '\n';
            i++;
          }
          const embed = new Discord.MessageEmbed()
            .setTitle("Selfroles for " + message.guild.name)
            .setDescription(text)
            .setTimestamp()
            .setColor("RANDOM");
          message.channel.send(embed);
        } else {
          return message.channel.send("This server has no selfroles assigned.");
        }
      }

      //AÃÂ±adir un selfrole
      if (args[0] === 'add') {

        //Verificar si tiene permisos primero
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`you do not have permission to execute this command.`)

        if (!args[1]) {
         return message.channel.send('Put a name for that selfrole') 
        } else {
           //El formato es <comando> add <nombre> -<rol>
           
          let roleobj = message.mentions.roles.first() || message.guild.roles.cache.get(role)
          if (!roleobj) {
            return message.channel.send('That role isn\'t valid. Mention the role or put the role ID.')
          } else {
            //Ver si existe ese nombre que han puesto.
            let findMsgDocument = await MessageModel
            .findOne({ guildid: message.guild.id, word: args.slice(1).join(" ") })
            .catch(err => console.log(err));
            if (findMsgDocument) {
              return message.channel.send("That name already exists...");
            } else {
              //Si no existe, crear un documento y guardarlo en la database
              let dbMsgModel = new MessageModel({
                guildid: message.guild.id,
                word: args.slice(2).join(" "),
                roleid: roleobj.id,
              });
              dbMsgModel.save()
                .then(m => {
                message.channel.send('Self role added correctly.');
                console.log(m);
              })
                .catch(err => {
                message.channel.send('Something bad happened. Here\'s a debug: ' + err)
                console.log(err);
              });
            }
          }
          
        }
      }
      //Vamos a unirnos a un rol!
      if (args[0] === 'join') {
        if (!args[1]) return message.channel.send('Put a selfrole name.')
        let name = args.slice(1).join(" ");
        //Buscamos el documento
        let msgDocument = await MessageModel.findOne({ guildid: message.guild.id, word: name });

        //Si, por una funciÃÂ³n :)
        let addMemberRole = (roleid) => {
          let role = message.guild.roles.cache.get(roleid)
          let member = message.member;
          if(role && member) {
              member.roles.add(role, 'Selfrole command').then(message.channel.send('I gave you the role correctly.')).catch(err => message.channel.send(`I can't give you the role. Here's a debug: ` + err));
            } else {
              //En caso eliminaron el rol
              message.channel.send('Something happened. That role still exists?')
            }
        }

        //Si no existe regresar ese mensaje, sino, ejecutar el comando
        if (!msgDocument) {
          return message.channel.send('That selfrole doesn\'t exist.');
        } else {
          var { roleid } = msgDocument;
          addMemberRole(roleid)
        }
      }

      //Vamos a dejar ese rol! Es lo mismo solo que esta vez es roles.remove
      if (args[0] === 'leave') {
        if (!args[1]) return message.channel.send('Put a selfrole name.')
        let name = args.slice(1).join(" ");
        let msgDocument = await MessageModel.findOne({ guildid: message.guild.id, word: name });
        let removeMemberRole = (roleid) => {
          let role = message.guild.roles.cache.get(roleid)
          let member = message.member;
          if(role && member) {
              member.roles.remove(role, 'Selfrole command').then(message.channel.send('I removed your role correctly.')).catch(err => message.channel.send(`I can't remove your role. Here's a debug: ` + err));
            } else {
              message.channel.send('Something happened. That role still exists?')
            }
        }
        if (!msgDocument) {
          return message.channel.send('That selfrole doesn\'t exist.');
        } else {
          var { roleid } = msgDocument;
          removeMemberRole(roleid)
        }
      }

      //Vamos a remover un rol de la lista
      if (args[0] === 'remove') {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`you do not have permission to execute this command.`)
        if (!args[1]) return message.channel.send('Tell me that selfrole should be removed from my database.')
        let name = args.slice(1).join(" ");
        let msgDocument = await MessageModel.findOne({ guildid: message.guild.id, word: name });
        if (msgDocument) {
          msgDocument.remove().then(m => {
            console.log(m);
            message.channel.send('I\'ve removed that selfrole from my database.');
          }).catch(err => message.channel.send('I was unable to remove that selfrole from my database. Here\'s a debug: ' + err));
        } else {
          return message.channel.send('That selfrole doesn\'t exist.');
        }
      }
    },
    aliases: [],
    description: "Add or remove roles from yourself",
}