const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    permissions: [Discord.PermissionFlagsBits.SendMessages],
    botp: [Discord.PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Test my ms of response!"),
    async run(client, interaction) {
        interaction.reply(`Pong! \`${client.ws.ping}\` ms`)
    }
}