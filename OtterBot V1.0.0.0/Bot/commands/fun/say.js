module.exports = {
	name: 'say',
	category: 'fun',
	description: 'talk as the bot',
	run: (client, message, args) => {
		message.delete();

		let perm = message.member.hasPermission("ADMINISTRATOR");

		if(!perm) return message.channel.send("nope, just admins can do it") 
	
		if (args.join(" ").length < 1) return message.channel.send("should talk more.");

		// Segundo se almacenan los permisos del usuario en el canal deseado para ver si tiene para mencionar a todos (@everyone/@here).
		let permisos = message.channel.permissionsFor(message.member);

		// Ahora se envía el mismo mensaje pero desactivando el @everyone/@here en el caso de que no llegue a tener permisos el usuario.
			message.channel.send(args.join(" "), {
    // Si en los permisos está "MENTION_EVERYONE" entonces no desactiva el @everyone, de lo contrario sí lo hará
    disableMentions: permisos.has("MENTION_EVERYONE") ? "none" : "everyone"
});
	}
}