const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const star = require('star-labs')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("interaction")
        .setDescription("Interact with someone doing some actions!")
        .addSubcommand(subCommand =>
            subCommand
                .setName("hug")
                .setDescription("Send a hug to someone!")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention that user to give a hug!")
                        .setRequired(true)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("kick")
                .setDescription("Kick someone, just a kick in their butt")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention that user to give a Kick!")
                        .setRequired(true)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("kiss")
                .setDescription("Kiss someone")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention someone to give a kiss!")
                        .setRequired(true)
                )
        ),
    async run(client, interaction) {
        const choice = interaction.options.getSubcommand();
        const user = interaction.options.getUser("user");

        switch (choice) {
            case "kick":
                if (user.id == interaction.user.id) {
                    return interaction.reply({
                        content: "How can you kick yourself? 🤔",
                        ephemeral: true
                    })
                }

                const kicked = new EmbedBuilder()
                    .setTitle(`${interaction.user.username} just kicked ${user.username}`)
                    .setImage(star.kick())
                    .setColor("Random")
                    .setFooter({ text: `Powered by ${client.user.username}` })

                interaction.reply({
                    embeds: [kicked]
                })
                break;
            case "hug":
                if (user.id == interaction.user.id) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${interaction.user.username} hugs themselve :)`)
                                .setImage(star.hug())
                                .setFooter({ text: `Powered by ${client.user.username}` })
                        ]
                    })
                }

                const hugs = new EmbedBuilder()
                    .setTitle(`${interaction.user.username} just hugs ${user.username}`)
                    .setImage(star.hug())
                    .setColor("Random")
                    .setFooter({ text: `Powered by ${client.user.username}` })

                interaction.reply({
                    embeds: [hugs]
                })

                break;

            case "kiss":
                if (user.id == interaction.user.id) {
                    return interaction.reply({
                        content: "How can you kiss yourself? 🤔",
                        ephemeral: true
                    })
                }

                const kisses = new EmbedBuilder()
                    .setTitle(`${interaction.user.username} just kiss ${user.username}`)
                    .setImage(star.kiss())
                    .setColor("Random")
                    .setFooter({ text: `Powered by ${client.user.username}` })

                interaction.reply({
                    embeds: [kisses]
                })
                break;
            default:
                break;
        }

    }
}