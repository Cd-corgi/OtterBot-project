const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'simulator',
	category: 'test',
	description: 'simulate a welcome',
		usage: '(prefix)simulator',
 run: async (client, message, args) => {
  if (message.author.id !== '451471780977311745') return;
//pones tu id para que otra gente no use el comando
      let embed = new MessageEmbed()
      .setDescription("Simulando Entrada al Servidor "+message.author.username)
//esto simula la entrada del servidor en el cual despues simulara con tu nombre.
      .setColor("RANDOM")
      message.channel.send(embed);
  
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );

 }
}