const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const schema = require('../../models/confession')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("confession")
        .setDescription("Declare your most secret confession as anonymous or in public")
        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("Write your secret")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("anonymous")
                .setDescription("Do you want your anem hidden?")
                .addChoices(
                    { name: "Yes", value: "yes" },
                    { name: "No", value: "no" }
                )
                .setRequired(true)
        ),
    async run(client, interaction) {
        const confesion = interaction.options.getString("text")
        const anonym = interaction.options.getString("anonymous")
        let exist = await schema.findOne({ guildID: interaction.guild.id })
        let time = Date.now() + (3 * 60 * 1000);

        if (client.cooldown.has(`${interaction.user.id}-conf-${interaction.guild.id}`)) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp(`You can do this command in <t:${Math.floor(client.cooldown.get(`${interaction.user.id}-conf`) / 1000)}:R>`)
        }

        if (confesion.length <= 2) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp(`Your confession is too short! make one a bit long`)
        }

        if (!exist) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp(`This server has not a confession channel yet!`)
        }

        switch (anonym) {
            case "yes":
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp(`✅ Confession sent!`)

                await client.channels.cache.get(exist.channelID).send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`An Anonymous Confession!`)
                            .setColor("Random")
                            .addFields({ name: "***Confession***", value: `||${confesion}||` })
                            .setThumbnail(client.user.displayAvatarURL())
                            .setTimestamp()
                            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    ]
                })
                break;
            case "no":
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp(`✅ Confession sent!`)

                await client.channels.cache.get(exist.channelID).send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${interaction.user.username}\'s Confession!`)
                            .setColor("Random")
                            .addFields({ name: "***Confession***", value: `||${confesion}||` })
                            .setThumbnail(interaction.user.displayAvatarURL())
                            .setTimestamp()
                            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    ]
                })
                break;
            default:
                break;
        }

        client.cooldown.set(`${interaction.user.id}-conf-${interaction.guild.id}`, time)

        setTimeout(() => {
            client.cooldown.delete(`${interaction.user.id}-conf-${interaction.guild.id}`)
        }, 900000)
    }
}