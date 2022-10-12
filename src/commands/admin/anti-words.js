const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const schemaWord = require('../../models/anti-words')
const { colors } = require('../../config/config.json')

module.exports = {
    permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ManageChannels],
    botp: [PermissionFlagsBits.ManageMessages],
    data: new SlashCommandBuilder()
        .setName("anti-words")
        .setDescription("try to manage like Delete/Add Wirds to the black list ...")
        .addSubcommand(option =>
            option
                .setName("add")
                .setDescription("Add Words to the black list.")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("Provide a word to add.")
                        .setRequired(true)
                )
        )
        .addSubcommand(option =>
            option
                .setName("remove")
                .setDescription("Removes Words from the black list.")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("Provide an exisintg word in the blacklist to remove.")
                        .setRequired(true)
                )
        )
        .addSubcommand(option =>
            option
                .setName("clear")
                .setDescription("Erase all the blacklisted words")
        )
        .addSubcommand(option =>
            option
                .setName("list")
                .setDescription("Check what words are in the Blacklist")
        ),
    async run(client, interaction) {
        const ww = interaction.options.getString("word")
        const opt = interaction.options.getSubcommand();

        let wow = await schemaWord.findOne({ guildID: interaction.guild.id })

        switch (opt) {
            case "add":
                if (ww.length < 2) {
                    await interaction.deferReply({ ephemeral: true });
                    return interaction.followUp("You should write a valid word (more than or equals of 2 characters)")
                }

                if (ww.length > 20) {
                    await interaction.deferReply({ ephemeral: true });
                    return interaction.followUp("The word is too much long... shor it a bit.")
                }

                if (!wow) {
                    new schemaWord({
                        guildID: interaction.guild.id,
                        words: [{
                            word: ww
                        }]
                    }).save();
                    await interaction.deferReply()
                    return interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("✅ Word Blacklisted!")
                                .setColor(colors.success)
                                .setTimestamp()
                        ]
                    }).then(() => setTimeout(() => interaction.deleteReply(), 10000)).catch(err => { })
                } else {
                    if (ww.length < 2) {
                        await interaction.deferReply({ ephemeral: true });
                        return interaction.followUp("You should write a valid word (more than or equals of 2 characters)")
                    }

                    if (ww.length > 20) {
                        await interaction.deferReply({ ephemeral: true });
                        return interaction.followUp("The word is too much long... shor it a bit.")
                    }

                    if (wow.words.some(ee => ee.word === ww)) {
                        await interaction.deferReply({ ephemeral: true })
                        return interaction.followUp(`The word \`${ww}\` is already blacklisted!`)
                    }

                    wow.words.push({ word: ww })

                    await schemaWord.updateOne({ guildID: interaction.guild.id }, { words: wow.words })

                    await interaction.deferReply()
                    return interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("✅ Word Blacklisted!")
                                .setColor(colors.success)
                                .setTimestamp()
                        ]
                    }).then(() => setTimeout(() => interaction.deleteReply(), 10000)).catch(err => { })
                }
                break;
            case "remove":
                if (!wow) {
                    await interaction.deferReply({ ephemeral: true });
                    return interaction.followUp(`This guild has not any blacklisted word ...`)
                } else {
                    if (!wow.words.some(ee => ee.word === ww)) {
                        await interaction.deferReply({ ephemeral: true });
                        return interaction.followUp(`The provided word couldn't be found`)
                    }

                    wow.words = wow.words.filter((v) => v.word !== ww)

                    await schemaWord.updateOne({ guildID: interaction.guild.id }, { words: wow.words })

                    await interaction.deferReply()
                    interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("✅ Word removed from the blacklist!")
                                .setColor(colors.success)
                                .setTimestamp()
                        ]
                    }).then(() => setTimeout(() => interaction.deleteReply(), 10000)).catch(err => { })
                }
                break;
            case "clear":
                await interaction.deferReply()

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("clear")
                            .setStyle("DANGER")
                            .setEmoji("🗑")
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("keep")
                            .setStyle("SUCCESS")
                            .setEmoji("🏠")
                    )

                if (!wow) {
                    await interaction.deferReply({ ephemeral: true })
                    return interaction.followUp(`This guild have not any blacklisted words to clear ...`)
                }

                let msg = await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription("Are you sure to clear the blacklist?")
                    ],
                    components: [row]
                })

                let filter = i => i.user.id === interaction.user.id;

                const collector = await interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 30000
                })

                collector.on("collect", async i => {
                    if (i.user.id !== interaction.user.id) return;

                    if (i.customId == "keep") {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("✅ Cancelled")
                                    .setColor("GREEN")
                            ],
                            components: []
                        })
                    }

                    if (i.customId == "clear") {

                        await schemaWord.deleteOne({ guildID: interaction.guild.id })
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`📜 Blacklist cleared.`)
                                    .setColor("GREEN")
                            ],
                            components: []
                        })
                    }
                })
                break;
            case "list":
                let palabras = []

                if (!wow) {
                    await interaction.deferReply({ ephemeral: true })
                    return interaction.followUp(`This guild have not any blacklisted words to consult ...`)
                } else {
                    let wa = await schemaWord.find({})

                    for (const object of wa) {
                        if(object.guildID == interaction.guild.id) {
                            palabras.push(object)
                        }
                    }

                    let pald = []

                    for (let i = 0; i < palabras[0].words.length; i++) {
                        pald.push(palabras[0].words[i].word)
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`📜 Blacklisted Words`)
                                .setColor("Random")
                                .setDescription(`\`${pald.join("\`, \`")}\``)
                        ]
                    })
                }
                break;
            default:
                break;
        }
    }
}