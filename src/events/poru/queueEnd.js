const Discord = require('discord.js')

module.exports = async (client, player) => {
    client.channels.cache.get(player.textChannel).send({
        embeds: [
            new Discord.EmbedBuilder()
                .setDescription(`📤 | The queue have been ended!`)
                .setColor("Random")
        ]
    })
    player.destroy();
}