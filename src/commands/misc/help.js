const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const path = require('path')
const fs = require('fs')
const wait = require('node:timers/promises').setTimeout;
const { ownerID } = require('../../config/config.json')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Trying to make a help menu a bit workable"),
    async run(client, interaction) {

        const misc = path.resolve(__dirname, "../misc")
        let c1 = []
        const main = path.resolve(__dirname, "../main")
        let c2 = []
        const music = path.resolve(__dirname, "../music")
        let c3 = []
        const context = path.resolve(__dirname, "../context")
        let c4 = []
        const admin = path.resolve(__dirname, "../admin")
        let c5 = []

        comands()

        const rowButton = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("redo")
                    .setEmoji("◀")
                    .setStyle(Discord.ButtonStyle.Secondary)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("del")
                    .setEmoji("🗑")
                    .setStyle(Discord.ButtonStyle.Danger)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("forw")
                    .setEmoji("▶")
                    .setStyle(Discord.ButtonStyle.Secondary)
            )

        const rowMenu = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId("menu")
                    .setMaxValues(1)
                    .addOptions(
                        {
                            label: "Home",
                            description: "Go back the the main embed!",
                            emoji: "🏠",
                            value: "home"
                        },
                        {
                            label: "Commands",
                            description: "Check the commands!",
                            emoji: "💬",
                            value: "cmds"
                        },
                        {
                            label: "Credits",
                            description: "Crediting the coolest people ever",
                            emoji: "🎉",
                            value: "cred"
                        }
                    )
            )

        const mainEmbed = new EmbedBuilder()
            .setTitle(`${client.user.username}\'s Help`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`All my commands are with \`/\`, use The Select Menu to explore them!`)
            .setColor("Random")

        const cmd1 = new EmbedBuilder()
            .setTitle("💬 Commands")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "General Commands", value: `\`${c1.join("\`, \`")}\`` },
                { name: "Misc Commands", value: `\`${c2.join("\`, \`")}\`` }
            )
        const cmd2 = new EmbedBuilder()
            .setTitle("💬 Commands")
            .addFields(
                { name: "Music Commands", value: `\`${c3.join("\`, \`")}\`` },
                { name: "Context Commands", value: `\`${c4.join("\`, \`")}\`` }
            )
        const cmd3 = new EmbedBuilder()
            .setTitle("page 3")
            .addFields(
                { name: "Moderation Commands", value: `\`${c5.join("\`, \`")}\`` }
            )

        let curPages = 0

        let pages = [
            cmd1,
            cmd2,
            cmd3
        ]

        rowButton.components[0].setDisabled(true)
        rowButton.components[2].setDisabled(true)
        await interaction.deferReply()
        let msg = await interaction.followUp({ embeds: [mainEmbed], components: [rowMenu, rowButton] })

        let filter = i => i.user.id === interaction.user.id;

        const collectorMenu = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: Discord.ComponentType.SelectMenu
        })

        const collectorButton = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: Discord.ComponentType.Button
        })

        collectorMenu.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id) return;
            if (i.values[0] === "home") {
                await i?.deferUpdate({ fetchReply: true }).catch(err => { })
                rowButton.components[0].setDisabled(true)
                rowButton.components[2].setDisabled(true)
                i.editReply({ embeds: [mainEmbed], components: [rowMenu, rowButton] })
            }
            if (i.values[0] === "cmds") {
                await i?.deferUpdate({ fetchReply: true }).catch(err => { })
                rowButton.components[0].setDisabled(false)
                rowButton.components[2].setDisabled(false)
                i.editReply({ embeds: [pages[curPages]], components: [rowMenu, rowButton] })
            }
            if (i.values[0] === "cred") {

                const rowPages = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Owner's YouTube")
                            .setEmoji("🎈")
                            .setURL("https://www.youtube.com/channel/UCnkviocxvPGS_80aNjJrCkQ")
                            .setStyle(Discord.ButtonStyle.Link)
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("GitHub")
                            .setEmoji("🐱")
                            .setURL("https://github.com/Cd-corgi")
                            .setStyle(Discord.ButtonStyle.Link)
                    )

                await i?.deferUpdate({ fetchReply: true }).catch(err => { })
                rowButton.components[0].setDisabled(true)
                rowButton.components[2].setDisabled(true)
                i.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("🎉 Credits")
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor("Random")
                            .addFields(
                                { name: "Owner", value: `<@${ownerID}>`, inline: true },
                                { name: "My Special Support", value: `<@539283901441376281>`, inline: true },
                                { name: "Bunny Hops' Designer", value: `<@991021821560250448>`, inline: true }
                            )
                    ],
                    components: [ rowMenu, rowButton, rowPages ]
                })
            }
        })

        collectorButton.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id) return;
            if (i.customId === "redo") {
                if (curPages !== 0) {
                    curPages -= 1;
                    await i?.deferUpdate({ fetchReply: true }).catch(err => { })
                    i.editReply({ embeds: [pages[curPages]], components: [rowMenu, rowButton] })
                } else {
                    curPages = pages.length - 1;
                    await i?.deferUpdate({ fetchReply: true }).catch(err => { })
                    i.editReply({ embeds: [pages[curPages]], components: [rowMenu, rowButton] })
                }
            }

            if (i.customId === "del") {
                await i?.deferUpdate().catch(err => { })
                i.deleteReply().catch(err => { })
            }

            if (i.customId === "forw") {
                if (curPages < pages.length - 1) {
                    curPages++;
                    await i?.deferUpdate().catch(err => { })
                    i.editReply({ embeds: [pages[curPages]], components: [rowMenu, rowButton] })
                } else {
                    curPages = 0;
                    await i?.deferUpdate().catch(err => { })
                    i.editReply({ embeds: [pages[curPages]], components: [rowMenu, rowButton] })
                }
            }
        })

        async function comands() {
            const mm1 = fs.readdirSync(`${main}`).filter(f => f.endsWith(".js"))
            for (const file of mm1) {
                let a = require(`${main}/${file}`)
                c1.push(a.data.name)
            }

            const mm2 = fs.readdirSync(`${misc}`).filter(f => f.endsWith(".js"))
            for (const file of mm2) {
                let b = require(`${misc}/${file}`)
                c2.push(b.data.name)
            }

            const mm3 = fs.readdirSync(`${music}`).filter(f => f.endsWith(".js"))
            for (const file of mm3) {
                let c = require(`${music}/${file}`)
                c3.push(c.data.name)
            }

            const mm4 = fs.readdirSync(`${context}`).filter(f => f.endsWith(".js"))
            for (const file of mm4) {
                let d = require(`${context}/${file}`)
                c4.push(d.data.name)
            }

            const mm5 = fs.readdirSync(`${admin}`).filter(f => f.endsWith(".js"))
            for (const file of mm5) {
                let d = require(`${admin}/${file}`)
                c5.push(d.data.name)
            }
        }
    }
}