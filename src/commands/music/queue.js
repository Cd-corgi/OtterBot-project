const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const { format } = require('../../utils/functions')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Speak],
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Check the list of the songs!"),
    async run(client, interaction) {
        let player = client.poru.players.get(interaction.guild.id);

        const queueList = new EmbedBuilder()
            .setTitle(`📜 Queue`)
            .setColor("Random")
            .setThumbnail("https://cdn.discordapp.com/attachments/937085230077071431/969333643342409769/anim-queue.gif")

        if (!player || !player.isConnected) {
            queueList.setDescription(`❌ | No one songs playing ...`)
            return interaction.reply({
                embeds: [queueList]
            })
        }

        let queue = player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;

        queueList.addFields({ name: "📀 **__Current Song__**", value: `\`${player.currentTrack.info.title}\` - \`${player.currentTrack.info.isStream ? "🔴 LIVE" : format(player.currentTrack.info.length)}\`` })

        if (queue.length) queueList.addFields(
            { name: "Incoming Songs", value: `${queue.map((track, index) => `\`${index + 1}\` - \`${track.info.title}\``).join("\n")}` }
        )

        interaction.reply({
            embeds: [queueList]
        })
    }
}