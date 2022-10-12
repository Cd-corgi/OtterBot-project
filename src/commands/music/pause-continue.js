const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect],
    botp: [PermissionFlagsBits.Connect, PermissionFlagsBits.SendMessages],
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName("pause-continue")
        .setDescription("Pause or Continue the current song!"),
    async run(client, interaction) {
        const player = client.poru.players.get(interaction.guild.id);

        if (!player || !player.isConnected) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ \`There's no current playing song!\``)
                        .setColor("Orange")
                ]
            })
        }

        if(player.isPaused) {
            player.pause(false);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`▶ Resuming`)
                        .setColor("Green")
                ]
            })
        } else {
            player.pause(true);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`⏸ Pausing`)
                        .setColor("Green")
                ]
            })
        }
    }
}