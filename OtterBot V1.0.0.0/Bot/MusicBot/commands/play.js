module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send("Join in a `vc` to start to play the music!")
				
				const string = args.slice(0).join(" ")
        if (!string) return message.channel.send(`❌ | Please enter a song url or query to search.`)

        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`❌| Error: \`${e}\``)
        }
    }
}