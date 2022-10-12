const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');
const Perspective = require('perspective-api-client')
const { API } = require('../../config/config.json')

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botp: [PermissionFlagsBits.SendMessages],
    data: new SlashCommandBuilder()
        .setName("analyze")
        .setDescription("Analize what percentage is the toxicity in your words!")
        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("Insert the text to test them!")
                .setRequired(true)
        ),
    async run(client, interaction) {
        const text = interaction.options.getString("text");
        const perspective = new Perspective({ apiKey: API })
        try {
            const result = await perspective.analyze(text);
            let obj = JSON.parse(JSON.stringify(result))
            let numR = `${parseInt(obj.attributeScores.TOXICITY.summaryScore.value * 100)}`
            var rounded = Math.ceil(numR);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Your Toxic-o-meter`)
                        .setColor("Green")
                        .setDescription(`Your message has a \`${rounded}%\` of Toxicity`)
                ]
            })
        } catch (error) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`❌ Error`)
                        .setColor("Red")
                        .setDescription(`\`${error}\``)
                ]
            })
        }
    }
}