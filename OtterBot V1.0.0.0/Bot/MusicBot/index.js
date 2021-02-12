const DisTube = require("distube")
const{ Discord, MessageEmbed, Client, Collection } = require("discord.js")
const client = new Client()
const fs = require("fs")
const config = require("dotenv")

client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
client.commands = new Collection()
client.aliases = new Collection()
client.emotes = config.emoji

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})


client.on("message", async message => {
    const prefix = process.env.PREFIX
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`❌ | You must be in a voice channel!`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
})

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
.on("playSong", (message, queue, song) => {
		const playing = new MessageEmbed()
		.setTitle("Shh~ n' relax...")
		.setColor("RANDOM")
		.setThumbnail("https://media.giphy.com/media/l0MYGcuCp4Y4HJY5i/giphy.gif")
		.addField("playing", `${song.name} - ${song.formattedDuration}`, true)
		.addField("requested by:", `${song.user}`, true)
		.addField("status", `${status(queue)}`)
		message.channel.send(playing)
				})
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => {
			let podcast = new MessageEmbed()
			.setTitle("A playlist has been added")
			.setColor("RED")
			.addField("Playlist name", `\`${playlist.name} with ${playlist.songs.length} songs!\``, true)
			.addField("Requested by", `${song.user}`, true)
			.addField("Now Playing", `\`${song.name}\` - \`${song.formattedDuration}\``)
			.setFooter(`\`${status(queue)}\``)

			message.channel.send(podcast)
		
		})
		.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 50;
		})
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
		.on("searchResult", (message, result) => {
        let i = 0;
				const list = new MessageEmbed ()
				.setTitle("**Choose an option from below**")
				.setColor("RED")
				.setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
				.setFooter("*Enter anything else or wait 60 seconds to cancel*")
				message.channel.send(list)
    })
    
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    })
		.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))
		.on("finish", message => {
			const left = new MessageEmbed()
			.setTitle("📤 Lefting Vc...")
			.setDescription("Lefting `Voice Channel` due with no more music in the queue")
			.setColor("WHITE")
			message.channel.send(left)
		}); 


client.login(process.env.TOKEN)