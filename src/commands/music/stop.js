const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.Connect],
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop and Disconnect the music!"),
    async run(client, interaction) {
        const player = client.poru.players.get(interaction.guild.id);

        if(!player.isConnected || player.isConnected && !player.isPlaying) return interaction.reply(`❌ I'm not playing anything to stop ...`)

        interaction.reply({ content: `⏹ Stopped!` })
        player.destroy();
    }
}