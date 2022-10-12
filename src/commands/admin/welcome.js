const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const wel = require('../../models/welcome');
const mongoose = require('mongoose')

module.exports = {
    permissions: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ManageChannels],
    botp: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles],
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Set a welcome channel!")
        .addSubcommand(subCommand =>
            subCommand
                .setName("set")
                .setDescription("Set a channel as welcome channel!")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Select a channel to set it as welcome inbox!")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("message")
                        .setDescription("Put your custom welcome message!")
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option
                        .setName("image")
                        .setDescription("Uses a Discord image link to set it up as background!")
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option
                        .setName("text-color")
                        .setDescription("Set what kind of color you what to the text (ONLY HEX COLOR CODE)")
                        .setRequired(false)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("clear")
                .setDescription("Restore and disable the welcome function!")
        ),
    async run(client, interaction) {

        const choice = interaction.options.getSubcommand();

        /*vars*/
        const chan = interaction.options.getChannel("channel");
        const txt = interaction.options.getString("message");
        const colorText = interaction.options.getString("text-color") || "000000";
        const img = interaction.options.getString("image") || "https://cdn.discordapp.com/attachments/937085230077071431/942804555983388713/portada.png";

        if (choice === "set") {

            if (colorText.length > 6) return interaction.reply("Invalid HEX color code, the number should be around 6 characters!")

            let regexp = /((?:https?:)?\/\/)?((?:cdn)\.)?((?:discordapp.com))?((?:\/attachments:?))/gs

            let curxp = regexp.test(img.toLowerCase().replace(/\s+/g, ''))

            if (!curxp) return interaction.reply("Only Attachment Discord links!")


            wel.findOne({ guildID: interaction.guild.id }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new wel({
                        guildID: interaction.guild.id,
                        channelID: chan.id,
                        welMessage: txt,
                        welImage: img,
                        welTextColor: colorText
                    }).save();

                    const setted = new EmbedBuilder()
                        .setTitle("Welcome system")
                        .setColor("Green")
                        .setDescription(`Your welcome channel is in ${chan} now!`)

                    interaction.reply({
                        embeds: [setted]
                    }).then(setTimeout(() => interaction.deleteReply(), 5000))
                    return;
                }
            })

            let alr = await wel.findOne({ guildID: interaction.guild.id });

            if (alr) {
                await alr.updateOne({ channelID: chan.id, welMessage: txt, welImage: img, welTextColor: colorText })
                interaction.reply("The welcome message have been modified!")
                return;
            }


        } else if (choice === "clear") {
            wel.findOne({ guildID: interaction.guild.id }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    interaction.reply({
                        content: "This guild have not a welcome channel yet",
                        ephemeral: true
                    })
                    return;
                }

                await wel.deleteOne({ guildID: interaction.guild.id })
                interaction.reply({
                    content: "Welcome message have been Disabled!",
                    ephemeral: true
                })

            })
        }
    }
}