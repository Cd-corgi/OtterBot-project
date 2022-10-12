const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [Discord.PermissionFlagsBits.Administrator],
    botp: [Discord.PermissionFlagsBits.ManageChannels],
    data: new SlashCommandBuilder()
        .setName("nuke")
        .setDescription("Destroy and clone a channel!"),
    async run(client, interaction) {
        var pos = interaction.channel.position;

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("nuke")
                    .setLabel("Nuke Channel")
                    .setEmoji("💬")
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Success)
                    .setCustomId("cancel")
                    .setLabel("Cancel")
                    .setEmoji("❌")
            )

        let msg = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("⚠ Warning")
                    .setDescription(`You are about to nuke \`#${interaction.channel.name}\`. Are you sure to Nuke it anyways?`)
            ],
            components: [row]
        })

        let filter = (i) => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: Discord.ComponentType.Button
        })


        collector.on("collect", async i => {
            if (i.user.id !== interaction.user.id) {
                await interaction.deferReply({ ephemeral: true })
                return interaction.followUp(`You are not able to choose!`)
            }

            if (i.customId === "cancel") {
                await i?.deferUpdate()
                i.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Red")
                            .setDescription("❌ Cancelled!")
                    ],
                    components: []
                }).then(() => setTimeout(() => i.deleteReply(), 5000))
            }
            if (i.customId === "nuke") {
                await i?.deferUpdate()
                i.deleteReply()
                interaction.channel.clone().then(ch => {
                    interaction.channel.delete()
                    ch.setPosition(pos)

                    ch.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Channel nuked!")
                        ]
                    })
                })
            }
        })
    }
}