module.exports = {
	name: 'lyrics',
	category: 'generator',
	description: 'searchs and print the lyrics from a music',
	usage: '(prefix)lyrics <song>',
	run: async(client, message, args) => {
		const { Util, MessageEmbed } = require('discord.js');
	const soleno = require('solenolyrics');

	// dentro de nuestro evento Message lo siguiente:

	const search = args.join(' ');

if (!search) {
    message.channel.send('`invalid Argument, insert the name of the song`');
    return;
}

	// desestructuramos el array resultante de nuestro await Promise.all()
		const [ lyrics, icon, title, author ] = await Promise.all([
    // array de promesas a resolver
    soleno.requestLyricsFor(search),
    soleno.requestIconFor(search),
    soleno.requestTitleFor(search),
    soleno.requestAuthorFor(search)
	]);
	// cr�amos el embed b�sico
	const embed = new MessageEmbed()
    .setTitle(title)
    .setAuthor(author, icon)
    .setColor('RANDOM');

	// Util.splitMessage() nos permitir� no superar el l�mite de caracteres de Discord
	// (�sta funci�n la d� Discord.js)
	// iteramos sobre el array de mensajes a enviar
	for (const song of Util.splitMessage(lyrics)) {
    // ponemos en el footer el resultado y enviamos el embed
    embed.setFooter(song);
    message.channel.send(embed);
    // �sto por si la canci�n es muy larga :(
}
	}
}