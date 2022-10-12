const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const toxic = require('../../models/toxic')

module.exports = {
    permissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageMessages],
    botp: [PermissionFlagsBits.ManageMessages],
    data: new SlashCommandBuilder()
        .setName("anti-toxic")
        .setDescription("Set up the sytem that it controls the toxic words!")
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("enable")
                .setDescription("Set the system on!")
                .addStringOption(option =>
                    option
                        .setName("custom-message")
                        .setDescription("put a custom message, Keywords: User = user name, Guild = server name")
                        .setRequired(false)
                )
        )
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("disable")
                .setDescription("Set the system off!")
        ),
    async run(client, interaction) {
        let elect = interaction.options.getSubcommand();
        let cmsg = interaction.options.getString("custom-message") || `**User**. Please no toxic words in **Guild**!`

        let gg = await toxic.findOne({ guildID: interaction.guild.id })

        switch (elect) {
            case "enable":
                if (gg) return interaction.reply({
                    content: "⚠ | `This function is already enabled!`",
                    ephemeral: true
                })

                new toxic({
                    guildID: interaction.guild.id,
                    Msg: cmsg
                }).save();

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`✅ | Anti-Toxic \`enabled\``)
                            .setColor("Green")
                            .setDescription(`And now, every user of **${interaction.guild.name}** that says a toxic/harassing/explicit word. It will be **erased**`)
                    ]
                })
                break;

            case "disable":
                if (!gg) return interaction.reply({
                    content: "⚠ | `This function is already disabled!`",
                    ephemeral: true
                })

                await toxic.deleteOne({ guildID: interaction.guild.id })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`✅ | Anti-Toxic \`disabled\``)
                            .setColor("Green")
                    ]
                })
                break;
            default:
                break;
        }

    }
}