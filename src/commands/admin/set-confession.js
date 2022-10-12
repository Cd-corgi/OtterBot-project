const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const schema = require('../../models/confession')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels],
    botp: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels],
    data: new SlashCommandBuilder()
        .setName("set-confession")
        .setDescription("Manage what is the channel to put your confession channel")
        .addSubcommand(option =>
            option
                .setName("set")
                .setDescription("Set or Modify what is the channel to set it as confession channel")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Provide the channel")
                        .setRequired(true)
                )
        )
        .addSubcommand(option =>
            option
                .setName("delete")
                .setDescription("Disable the confession channel")
        ),
    async run(client, interaction) {
        const sc = interaction.options.getSubcommand()
        const channel = interaction.options.getChannel("channel")
        let exist = await schema.findOne({ guildID: interaction.guild.id })

        switch (sc) {
            case "set":
                if(!exist) {
                    new schema({
                        guildID: interaction.guild.id,
                        channelID: channel.id
                    }).save()
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The channel ${channel} is the confession channel now!`)
                                .setColor("Green")
                        ]
                    })
                } else {
                    await schema.findOneAndUpdate({ guildID: interaction.guild.id }, { channelID: channel.id })
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`The channel ${channel} is the confession channel now!`)
                                .setColor("Green")
                        ]
                    })
                }
                break;

            case "delete":
                    if(!exist) {
                        await interaction.deferReply({ ephemeral: true })
                        return interaction.followUp(`This server have not any confession channel yet!`)
                    }

                    await schema.findOneAndDelete({ guildID: interaction.guild.id })
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Confession Channel is disabled now!`)
                                .setColor("Green")
                        ]
                    })
                break;
            default:
                break;
        }
    }
}