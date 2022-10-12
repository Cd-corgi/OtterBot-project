const Discord = require('discord.js')
const { format } = require('../../utils/functions')

module.exports = async (client, player, track) => {
    let Color = ""
    let so = ""

    const embedp = new Discord.EmbedBuilder()
    embedp.addFields(
        { name: `💬 Song Title`, value: `**[${track.info.title}](${track.info.uri})** - ${track.info.isStream ? "🔴 \`LIVE\`" : `\`${format(track.info.length)}\``}`, inline: true }
    )

    if (track.info.sourceName === "spotify") {
        Color = "Green"
        so = "Spotify"
        embedp.addFields({ name: `🗣 Requested`, value: `${track.info.requester}`, inline: true })
    } else if (track.info.sourceName === "youtube") {
        Color = "Red"
        so = "Youtube"
        embedp.addFields({ name: `🗣 Requested`, value: `${track.info.requester}`, inline: true })
    } else if (track.info.sourceName === "Apple Music") {
        Color = "White"
        so = "Apple Music"
        embedp.addFields({ name: `🗣 Requested`, value: `${track.info.requester}`, inline: true })
    } else if (track.info.sourceName === "soundcloud"){
        Color = "Orange" 
        so = "Sound Cloud"
        embedp.addFields({ name: `🗣 Requested`, value: `${track.info.requester}`, inline: true })
    } else if (track.info.sourceName === "http") {
        Color = "Purple"
        so = "Radio"
        embedp.setImage("https://media.discordapp.net/attachments/936271538196451379/1028764687082459236/lide-radio.png?width=1025&height=195")
    }

    embedp.setTitle(`▶ Now Playing`)
    embedp.setColor(Color)
    embedp.setFooter({ text: `🔈 Volume: ${player.volume}% | 💿 Source: ${so}` })
    embedp.setThumbnail("https://cdn.discordapp.com/attachments/937085230077071431/969333643342409769/anim-queue.gif")

    // console.log(track.info.sourceName)

    client.channels.cache.get(player.textChannel).send({
        embeds: [
            embedp
        ]
    })
}