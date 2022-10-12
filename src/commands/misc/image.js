const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("Use some funny and random image commands!")
        .addSubcommand(subCommand =>
            subCommand
                .setName("biden")
                .setDescription("Just put text there to make biden post it on twitter!")
                .addStringOption(option =>
                    option
                        .setName("text")
                        .setDescription("Provide the text for it!")
                        .setRequired(false)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("gun")
                .setDescription("Put a gun in your hand and make sure who rules!")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention a user to put in him/her/them a gun")
                        .setRequired(false)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("opinion")
                .setDescription("Make your father shoots you about your words")
                .addStringOption(option =>
                    option
                        .setName("text-here")
                        .setDescription("What opinion what you have to say?")
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Put your victim here (leave in empty to put yourself)")
                        .setRequired(false)
                )

        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("drip")
                .setDescription("Show the people how dope you are")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention a user to put the supremme suit (leave in empty to put yourself)")
                        .setRequired(false)
                )
        ),
    async run(client, interaction) {
        const elect = interaction.options.getSubcommand();
        const txt = interaction.options.getString("text") || "Bunny Hops.inc is so cool!";

        if (elect === "biden") {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("OMFG BIDEN JUST POSTED A TWEET")
                        .setImage(`https://api.popcat.xyz/biden?text=${txt.replace(/\s/g, "+")}`)
                ]
            })
        }

        if (elect === "gun") {
            const user = interaction.options.getUser("user");

            if (user) {
                const pfp = user.displayAvatarURL({ format: 'png', dynamic: false })
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://api.popcat.xyz/gun?image=${pfp}?size=4096`)
                    ]
                })
            } else {
                const user = interaction.member.displayAvatarURL({ format: 'png', dynamic: true })
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://api.popcat.xyz/gun?image=${user}?size=4096`)
                    ]
                })
            }

        }

        if (elect === "opinion") {
            const user = interaction.options.getUser("user");
            const text = interaction.options.getString("text-here");

            if (user) {
                const pfp = user.displayAvatarURL({ dynamic: false, format: 'png' })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://api.popcat.xyz/opinion?image=${pfp}&text=${text.replace(/\s/g, '+')}`)
                    ]
                })
            } else {
                const pfp = interaction.member.displayAvatarURL({ dynamic: false, format: 'png' })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://api.popcat.xyz/opinion?image=${pfp}&text=${text.replace(/\s/g, '+')}`)
                    ]
                })
            }
        }

        if (elect === "drip") {
            const user = interaction.options.getUser("user");

            if (user) {
                const pfp = user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 })

                const dd = `https://api.popcat.xyz/drip?image=${pfp}`

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`${dd}`)
                    ]
                })
            } else {
                const pfp = interaction.member.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 })

                const dd = `https://api.popcat.xyz/drip?image=${pfp}`

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`${dd}`)
                    ]
                })
            }
        }
    }
}