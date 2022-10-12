const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels],
    botp: [PermissionFlagsBits.ManageMessages],
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Erase an amount of messages")
        .addNumberOption(option =>
            option
                .setName("amount")
                .setDescription("define what is the amount of messages to delete")
                .setRequired(true)
        ),
    async run(client, interaction) {
        const amount = interaction.options.getNumber("amount")

        if(parseInt(amount) > 299) {
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({
                embeds: [
                    new EmbedBuilder().setDescription(`❌ | \`I can\'t delete over of 299 messages!\``)
                ]
            })
        }
        try {
            let { size } = await interaction.channel.bulkDelete(amount)
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`I deleted \`${size}\` messages!`)
                        .setTimestamp()
                        .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                ]
            }).then(() => setTimeout(() => interaction.deleteReply(), 7500))
        } catch (error) {
            interaction.reply(`❌ | An error just happened!`)
        }
    }
}

