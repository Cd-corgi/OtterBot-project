const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch')
const wait = require('util').promisify(setTimeout);

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Look the memes on Reddit!"),
    async run(client, interaction) {
        fetch("https://api.popcat.xyz/meme").then(response => response.json()).then(async data => {
            const mem = new EmbedBuilder()
                .setTitle(`Memes on Reddit`)
                .setURL(`${data.url}`)
                .addFields(
                    { name: "Meme Title", value: `${data.title}`, inline: true },
                    { name: "Upvotes", value: `${data.upvotes}`, inline: true },
                    { name: "Comments 💬", value: `${data.comments}`, inline: true }
                )
                .setImage(`${data.image}`)
                .setFooter({ text: `Powered by ${client.user.username}` })

            await interaction.deferReply();
            await wait(3000)
            await interaction.editReply({
                embeds: [mem]
            })
        }).catch(e => {
            return interaction.reply({
                content: "Wel, the meme couldn't be found!"
            })
        })
    }
}