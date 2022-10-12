const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const spam = require('../../models/anti-spam')
const { colors } = require('../../config/config.json')

module.exports = {
    permissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ModerateMembers],
    botp: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ModerateMembers],
    data: new SlashCommandBuilder()
        .setName("anti-spam")
        .setDescription("Manage the system to prevent the spamming..")
        .addSubcommand(option =>
            option
                .setName("manage")
                .setDescription("manages the system to enable or disable in channels")
                .addStringOption(option =>
                    option
                        .setName("toggle")
                        .setDescription("Define if you want to enable/disable the system.")
                        .addChoices(
                            {
                                name: "Enable",
                                value: "enable"
                            },
                            {
                                name: "Disable",
                                value: "disable"
                            }
                        )
                        .setRequired(true)
                )
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Provide what channel you want to enable this system.")
                        .setRequired(true)
                )
        )
        .addSubcommand(option =>
            option
                .setName("panel")
                .setDescription("Shows what channels has the system enabled.")
        ),
    async run(client, interaction) {
        const tt = interaction.options.getString("toggle")
        const channel = interaction.options.getChannel("channel")
        let ssa = await spam.findOne({ guildID: interaction.guild.id })
        const key = interaction.options.getSubcommand();

        switch (key) {
            case "manage":
                switch (tt) {
                    case "enable":
                        if (!ssa) {
                            new spam({
                                guildID: interaction.guild.id,
                                Channels: [{
                                    ChannelID: channel.id
                                }]
                            }).save();

                            await interaction.deferReply();
                            interaction.followUp({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`✅ Anti-Spam Enabled in <#${channel.id}>`)
                                        .setColor(colors.success)
                                        .setTimestamp()
                                ]
                            })
                        } else {
                            if (ssa.Channels.some(v => v.ChannelID == channel.id)) {
                                await interaction.deferReply({ ephemeral: true });
                                return interaction.followUp(`This channel has already enabled the anti-spam`)
                            }

                            ssa.Channels.push({ ChannelID: channel.id })

                            await spam.findOneAndUpdate({ guildID: interaction.guild.id }, { Channels: ssa.Channels })

                            await interaction.deferReply();
                            interaction.followUp({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`✅ Anti-Spam Enabled in <#${channel.id}>`)
                                        .setColor(colors.success)
                                        .setTimestamp()
                                ]
                            })

                        }
                        break;

                    case "disable":
                        if (!ssa) {
                            await interaction.deferReply({ ephemeral: true });
                            return interaction.followUp({
                                content: `This guild has not any channel with the anti-spam installed.`
                            })
                        } else {
                            if (!ssa.Channels.some(v => v.ChannelID == channel.id)) {
                                await interaction.deferReply({ ephemeral: true });
                                return interaction.followUp({
                                    content: `This channel couldn0t be found in my system...`
                                })
                            }

                            ssa.Channels = ssa.Channels.filter(v => v.ChannelID !== channel.id)

                            await spam.findOneAndUpdate({ guildID: interaction.guild.id }, { Channels: ssa.Channels })

                            await interaction.deferReply();
                            interaction.followUp({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`✅ Anti-Spam Disabled   in <#${channel.id}>`)
                                        .setColor(colors.success)
                                        .setTimestamp()
                                ]
                            })
                        }
                        break;

                    default:
                        break;
                }

                break;
            case "panel":
                let arraylink = []

                if (!ssa) {
                    await interaction.deferReply({ ephemeral: true })
                    return interaction.followUp(`The system couldn't find the Guild`)
                } else {
                    let lainks = await spam.find({});

                    for (const object of lainks) {
                        if (object.guildID == interaction.guild.id) {
                            arraylink.push(object)
                        }
                    }

                    const panel = new EmbedBuilder()
                        .setTitle(`${interaction.guild.name}\'s Anti-Spam Enabled List`)
                        .setColor("Random")

                    let chan = []

                    if (arraylink[0].Channels.length < 1) {
                        chan.push("No Channels Added")
                    } else {
                        for (let i = 0; i < arraylink[0].Channels.length; i++) {
                            chan.push(`<#${arraylink[0].Channels[i].ChannelID}>`)
                        }
                    }
                    panel.addFields({ name: `Channels`, value: `${chan.join(", ")}` })
                    panel.setTimestamp()

                    interaction.reply({
                        embeds: [
                            panel
                        ]
                    })
                }
                break;

            default:
                break;
        }
    }
}