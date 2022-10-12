const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const { format } = require("../../utils/functions")

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName("now-playing")
        .setDescription("Check how is going the song"),
    async run(client, interaction) {
        const player = client.poru.get(interaction.guild.id)

        let so = ""
        let Color = ""

        if (!player || !player.isConnected) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ | There's no songs playing ...")
                        .setColor("DarkRed")
                ]
            })
        }

        let part = Math.floor((player.position / player.currentTrack.info.length) * 30)

        const embednp = new EmbedBuilder()
            .setTitle(`${player.isPaused ? "⏸" : "▶"} Now playing`)
            .setThumbnail("https://cdn.discordapp.com/attachments/937085230077071431/969333643342409769/anim-queue.gif")
            .addFields(
                { name: "📀 **Song**", value: `${player.currentTrack.info.title}`, inline: true }
            )

        if (player.currentTrack.info.sourceName === "spotify") {
            Color = "Green"
            so = "Spotify"
            embednp.addFields({ name: "👦 **Requester**", value: `${player.currentTrack.info.requester}`, inline: true })
        } else if (player.currentTrack.info.sourceName === "youtube") {
            Color = "Red"
            so = "Youtube"
            embednp.addFields({ name: "👦 **Requester**", value: `${player.currentTrack.info.requester}`, inline: true })

        } else if (player.currentTrack.info.sourceName === "http") {
            Color = "Purple"
            so = "radop"
        } else {
            Color = "Orange"
            so = "Other"
            embednp.addFields({ name: "👦 **Requester**", value: `${player.currentTrack.info.requester}`, inline: true })
        }
        embednp.addFields({ name: "🕒 Duration", value: `${player.currentTrack.info.isStream ? "🔴 \`LIVE\`" : `\`${format(player.position)}\` [ ${"-".repeat(part) + "🔵" + "-".repeat(30 - part)} ] \`${format(player.currentTrack.info.length)}\``}` })
        embednp.setColor(Color)
        embednp.setFooter({ text: `${client.user.username} | 🔈 ${player.volume}% | 💿 Source: ${so}`, iconURL: client.user.displayAvatarURL() })
        interaction.reply({
            embeds: [embednp]
        })
    }
}