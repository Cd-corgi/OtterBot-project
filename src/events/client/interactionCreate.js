const Discord = require('discord.js')

module.exports = async (client, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let slashCMD = client.commands.get(interaction.commandName)

        if (!slashCMD) return;

        const user = interaction.guild.members.cache.get(interaction.user.id);

        if (!user.permissions.has(slashCMD.permissions || [])) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(":x: | Permission Error")
                        .setDescription(`Please get the enough permissions to do the commands!\nPermissions:\n\`${new Discord.PermissionsBitField(slashCMD.permissions).toArray().join("\`, \`")}\``)
                        .setTimestamp()
                        .setColor(Discord.Colors.Red)
                ],
                ephemeral: true
            })
        }

        if (!interaction.guild.members.me.permissions.has(slashCMD.botP || [])) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(":x: | Permission Error")
                        .setDescription(`Please give me the enough permissions to do the commands!\nPermissions:\n\`${new Discord.PermissionsBitField(slashCMD.botP).toArray().join("\`, \`")}\``)
                        .setTimestamp()
                        .setColor(Discord.Colors.Red)
                ],
                ephemeral: true
            })
        }

        if (slashCMD.inVoiceChannel && !interaction.member.voice.channel) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`You should be in a \`Voice Channel\` first`)
                        .setColor(Discord.Colors.Yellow)
                ],
                ephemeral: true
            })
        }

        if (slashCMD.inVoiceChannel && interaction.guild.members.me.voice.channel && interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`You should be in the same \`Voice Channel\` where i am`)
                        .setColor(Discord.Colors.Yellow)
                ],
                ephemeral: true
            })
        }

        if (slashCMD.checkLive) {
            const player = client.poru.players.get(interaction.guild.id);

            if (player) {
                if (player.currentTrack.info.isStream) {
                    await interaction.deferReply()
                    return interaction.followUp({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`There's a Live Stream or Radio playing right now! use \`/stop\` to disable it`)
                                .setColor("Red")
                        ]
                    })
                }
            }
        }

        try {
            await slashCMD.run(client, interaction)
        } catch (e) {
            console.log(e)
        }
    }
}