module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`❓ | There is nothing in the queue right now!`)

        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`❌ | Please enter a valid number!`)
        client.distube.setVolume(message, volume)
        message.channel.send(`✅ | Volume set to \`${volume}\``)
    }
}