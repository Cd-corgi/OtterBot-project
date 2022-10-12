const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect],
    botp: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak],
    inVoiceChannel: true,
    checkLive: true,
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Go to the next song!"),
    async run(client, interaction) {
        const player = client.poru.players.get(interaction.guild.id);

        if(!player || !player.isConnected) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ \`There's no songs to skip!\``)
                        .setColor("Orange")
                ]
            })
        }

        if(player.currentTrack.info.isStream) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`There's a Live Stream or Radio playing right now! use \`/stop\` to disable it`)
                        .setColor("Red")
                ]
            })
        }

        if(player.queue.length < 1) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ \`There's no more songs to skip!\``)
                        .setColor("Orange")
                ]
            })
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`⏩ Skipping ...`)
                    .setColor("Random")
            ]
        }).then(() => setTimeout(() => interaction.deleteReply(), 5000)).catch((err) => { })
        player.stop()
    }
}