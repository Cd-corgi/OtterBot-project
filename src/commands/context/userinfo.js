const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { stripIndent } = require('common-tags')
module.exports = {
    permissions: [PermissionFlagsBits.SendMessages],
    botP: [PermissionFlagsBits.SendMessages],
    data: new ContextMenuCommandBuilder()
        .setName("User info")
        .setType(ApplicationCommandType.User),
    async run(client, interaction) {
        let userColor = client.users.fetch(interaction.targetUser, {
            force: true
        }).then(data => {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`👦 User info`)
                        .setThumbnail(interaction.targetUser.displayAvatarURL())
                        .addFields(
                            {
                                name: "👦 User info",
                                value: stripIndent`
                                🏷 **Name**: ${interaction.targetUser.username}
                                🔴 **ID**: ${interaction.targetUser.id}
                                👶 **Created At**: <t:${Math.floor(interaction.targetUser.createdTimestamp / 1000)}:d>
                                🤖 **BOT**: ${data.bot == true ? "\`Yes\`" : "\`No\`"}
                                `,
                                inline: true
                            },
                            {
                                name: "🎈 Roles",
                                value: `${interaction.guild.members.cache.get(interaction.targetUser.id).roles.cache.size ? interaction.guild.members.cache.get(interaction.targetUser.id).roles.cache.map(roles => `**${roles}**`).slice(0, -1).join(" ") : "No Roles"}`
                            }
                        )
                        .setColor(data.accentColor == null ? "Black" : data.accentColor)
                ],
                ephemeral: true
            })
        })
    }
}