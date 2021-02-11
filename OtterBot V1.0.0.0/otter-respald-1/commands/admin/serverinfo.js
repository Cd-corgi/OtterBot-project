const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'serverinfo',
	category: 'admin',
	description: 'explore about the server',
	usage: '(prefix)serverinfo',
	run: (client, message, args) => {
		message.delete()
	var permisos = message.member.hasPermission("MANAGE_ROLES");

	if (!permisos) { /*Si la persona no tiene los permisos de arriba, enviará este embed*/
  const NoPermisos = new MessageEmbed()
  .setAuthor(message.author.username)
	.setDescription("MISSING PERMISSIONS!")
	.addField("`You cannot do this command. only mods or higher can do this function.`", ":otter:")
  .setColor("BLACK")
  message.channel.send(NoPermisos).then(m => m.delete({timeout: 10000}))
  return NoPermisos /*Retornamos acá*/
  }
	
	var server = message.guild;//definimos server


const embed = new MessageEmbed()//creamos un embed
.setTitle("**Server info!**")//establecemos titulo
.setDescription("**About the server right now!**")//establecemos descripcion
.setThumbnail(server.iconURL())//aca aparecera el icono del server
.setAuthor(server.name, server.iconURL())//aca va a aparecer el icono y nombre del server
.addField('**ID**', server.id, true)//esto es para obtener la id del server
.addField('**Created at:**',`${server.joinedAt}`)//con esto obtenemos la fecha de creacion del server
.addField("**Region:**", message.guild.region)//con esto obtenemos la region del server
.addField("**Owner:**",`${server.owner.user}`)//con esto obtenemos el creador del server
.addField("** Owner ID :**",`${server.ownerID}`)//con esto la id del creador del server
.addField(`**Channels:** [${server.channels.cache.size}]ㅤㅤ`, `Category: ${server.channels.cache.filter(x => x.type === "category").size} Text: ${server.channels.cache.filter(x => x.type === "text").size} Voice: ${server.channels.cache.filter(x => x.type === "voice").size}`, true)
//con esto todos los canales del servidor
.addField('**Members**', server.memberCount, true)//con esto obtenemos los miembros que hay en el server
.addField("**BOTS**",`${message.guild.members.cache.filter(m => m.user.bot).size}`)//con esto obtenemos los bots del server
.addField('**Emojis**',message.guild.emojis.cache.size)//con esto todos los emojis del server 
.addField('**Boosted**',message.guild.premiumSubscriptionCount.toString())// con esto el numero de booster del server
.addField('**Verification level**',`${server.verificationLevel}`)//con esto obtenemos el nivel de verificacion del server
.addField('**Roles**', server.roles.cache.size,true)//con esto la cantidad de roles
.setColor("RANDOM")//establecemos el color  yo puse random para que salga diferente color
message.channel.send(embed);
	}
}