const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [Discord.PermissionFlagsBits.BanMembers],
    botp: [Discord.PermissionFlagsBits.BanMembers],
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban the mentioned user!")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription("Mention someone to ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Provide a reason to give a ban")
                .setRequired(false)
        ),
    async run(client, interaction) {
        /* hello */

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

        if (!member) return interaction.reply("😅 | Unable to get details related to given member.");
        const reason = interaction.options.getString('reason') || `\`UNKNOWN REASON\``

        if (!member.bannable || member.user.id === client.user.id)
            return interaction.reply("😅 | I am unable to ban this member");

        if (interaction.member.roles.highest.position <= member.roles.highest.position)
            return interaction.reply('Given member have higher or equal rank as you so i can not ban them.')

        const embed = new EmbedBuilder()
            .setTitle("✅ | An User just got banned!")
            .addFields(
                { name: `**User Banned**`, value: `**${member.user.tag}**`, inline: true },
                { name: "**Reason**", value: `${reason}`, inline: false }
            )
            .setColor("Green")
            .setFooter({ text: "Ban Member" })
            .setTimestamp()

        await member.user.send(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => { })
        member.ban({ reason })

        return interaction.reply({ embeds: [embed] })
    }
}