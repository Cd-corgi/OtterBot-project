const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [Discord.PermissionFlagsBits.KickMembers],
    botp: [Discord.PermissionFlagsBits.KickMembers],
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a mentioned user!")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Mention someone to kick")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Provide a reason to give a kick")
                .setRequired(false)
        ),
    async run(client, interaction) {
        const target = interaction.options.getMember('user');

        const reason = interaction.options.getString('reason') || "\`UNKNOWN REASON\`";


        if (target.roles.highest.position >= interaction.member.roles.highest.position) {
            const error1 = new EmbedBuilder()
                .setTitle(':x: | An error have been appeared!')
                .setDescription("I can't kick someone with a higher role than you.")
                .setColor("Red")

            interaction.reply({
                embeds: [error1],
                ephemeral: true
            })
            return;
        }

        try {
            const suc = new EmbedBuilder()
                .setTitle(`✔ | You have kicked someone...`)
                .addFields(
                    { name: "User Kicked", value: `<@${target.id}>`, inline: true },
                    { name: "Reason", value: `\`${reason}\``, inline: true }
                )
            interaction.reply({
                embeds: [suc]
            })
            target.kick(reason);
            target.send(`You have been kicked from **${interaction.guild.name}**\n> REASON: ${reason}`)
        } catch (e) {
            interaction.reply({
                content: `An error just happened! ${e}\n**POSSIBLE REASONS**\n> May you kivked a bot who doesn't accept DMS\n> API issues, contact the Bot owner`,
                ephemeral: true
            })
        }

    }
}