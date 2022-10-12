const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const warndb = require('../../models/warns');
const Discord = require('discord.js');

module.exports = {
    permissions: ["KICK_MEMBERS"],
    botp: ["KICK_MEMBERS"],
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn the users to moderate them")
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("add")
                .setDescription("Add a warning to a user")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention someone to warn")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Define the reason of the warn")
                )
        )
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("remove")
                .setDescription("Remove a warn to a user")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention someone to unwarn")
                        .setRequired(true)
                )
                .addNumberOption(option =>
                    option
                        .setName("id")
                        .setDescription("Define what id of the warn you want to remove")
                        .setRequired(true)
                )
        )
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("clear")
                .setDescription("Clears all warns of the user")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention someone to clear all warns")
                        .setRequired(true)
                )
        )
        .addSubcommand(Subcommand =>
            Subcommand
                .setName("list")
                .setDescription("Consult about the user's warns")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Mention someone to see their warn list")
                        .setRequired(true)
                )
        ),
    async run(client, interaction) {
        const choice = interaction.options.getSubcommand();
        const users = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided";
        const id = interaction.options.getNumber("id");

        let idx = 1;

        const exist = await warndb.findOne({ userID: users.id, guildID: interaction.guild.id });

        switch (choice) {
            case "add":

                if (users.bot === true) {
                    return interaction.reply({
                        content: `You can't warn Bots!`,
                        ephemeral: true

                    })
                }
                if (!exist) {
                    new warndb({
                        guildID: interaction.guild.id,
                        userID: users.id,
                        warns: [{
                            id: idx,
                            reason,
                            date: Date.now(),
                            author: interaction.user.id
                        }]
                    }).save();

                    interaction.reply({
                        content: `${users} got warned by <@${interaction.user.id}> due **${reason}**`
                    })

                    return;
                }

                const exist2 = await warndb.findOne({ userID: users.id, guildID: interaction.guild.id });

                for (let i = 1; i < 3; i++) {
                    if (exist2.warns.some(v => v.id == i)) {
                        if (idx > 3) {
                            break;
                        } else {
                            idx = idx + 1;
                        }
                    } else {
                        break;
                    }
                }

                exist2.warns.push({ id: idx, reason, date: Date.now(), author: interaction.user.id })

                await warndb.findOneAndUpdate({ guildID: interaction.guild.id, userID: users.id }, { warns: exist2.warns })

                if (exist2.warns.length >= 3) {
                    await warndb.findOneAndDelete({ guildID: interaction.guild.id, userID: users.id })
                    interaction.guild.members.cache.get(users.id).kick({ reason })
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("⚠ | Warn System Alarm")
                                .setDescription(`${users.username} got kicked from ${interaction.guild.name} due reaching the warn limit!`)
                                .setTimestamp()
                        ]
                    })

                    return;
                }

                interaction.reply({
                    content: `${users} got warned by <@${interaction.user.id}> due **${reason}**`
                })

                break;

            case "remove":
                if (!exist) {
                    interaction.reply({
                        content: `This user has not warns to remove`,
                        ephemeral: true
                    })
                }

                if (!exist.warns.some(v => v.id === id)) {
                    return interaction.reply({
                        content: `The provided warn ID couldn't be found`,
                        ephemeral: true
                    })
                }

                exist.warns = exist.warns.filter((v) => v.id !== id);

                await warndb.findOneAndUpdate({ guildID: interaction.guild.id, userID: users.id }, { warns: exist.warns })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`I've removed the Warn #${id} from the ${users.username}'s Warn List`)
                            .setColor("GREEN")
                    ]
                })

                break;

            case "clear":

                if (!exist) return interaction.reply({
                    content: `This user has not warnings to clear`,
                    ephemeral: true
                })

                let row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("cls")
                            .setLabel("Yes")
                            .setStyle(Discord.ButtonStyle.Success)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("can")
                            .setLabel("No")
                            .setStyle(Discord.ButtonStyle.Danger)
                    )

                let msg = await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Are you sure that you want to clear the warning list of \`${users.username}\`?`)
                    ],
                    components: [row]
                })

                const filter = i => i.user.id === interaction.user.id;

                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 30000
                })

                collector.on("collect", async i => {
                    if (i.customId === "cls") {
                        await i.deferUpdate()
                        await warndb.findOneAndDelete({ guildID: interaction.guild.id, userID: users.id })
                        i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${users.username}'s Warn list got restored to \`0 warnings\``)
                                    .setColor("GREEN")
                            ],
                            components: []
                        })
                    }

                    if (i.customId === "can") {
                        await i.deferUpdate()
                        await i.deleteReply()
                    }
                })

                collector.on("end", async (collected) => {
                    if (collected.size < 1) {
                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Cancelled by Timeout!")
                                    .setColor("RED")
                            ],
                            components: []
                        })
                    }
                })

                break;

            case "list":

                let color = "";
                let content = "";

                if (!exist) {
                    color = "Green";
                    content += "The user have not Warnings";

                    const warnlist = new EmbedBuilder()
                        .setTitle(`${users.username}'s Warn List`)
                        .setThumbnail(users.displayAvatarURL({ dynamic: true }))
                        .setColor(color)
                        .setDescription(content)
                        .setFooter({ text: `Try to do not break the rules` })

                    return interaction.reply({
                        embeds: [warnlist]
                    })

                }

                if (exist.warns.length == 0) {
                    color = "Green"
                    content += "The user have not Warnings";
                } else if (exist.warns.length == 1) {
                    color = "Yellow"
                } else if (exist.warns.length == 2) {
                    color = "Orange"
                } else if (exist.warns.length == 3) {
                    color = "Red"
                }

                exist.warns.forEach(v => {
                    content += `**Warn #${v.id}**\n> **Reason**: \`${v.reason}\`\n> **Warning Date**: \`${v.date}\`\n> **Author**: <@${v.author}>\n\n`
                });

                const warnlist = new EmbedBuilder()
                    .setTitle(`${users.username}'s Warn List`)
                    .setThumbnail(users.displayAvatarURL({ dynamic: true }))
                    .setColor(color)
                    .setDescription(content)
                    .setFooter({ text: `Try to do not break the rules` })

                interaction.reply({
                    embeds: [warnlist]
                })

                break;

            default:
                break;
        }
    }
}