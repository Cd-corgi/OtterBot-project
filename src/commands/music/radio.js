const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.Connect],
    btop: [PermissionFlagsBits.Connect, PermissionFlagsBits.SendMessages],
    inVoiceChannel: true,
    data: new SlashCommandBuilder()
        .setName("radio")
        .setDescription("📻 Select a Radio Station to play in 24/7")
        .addStringOption(option =>
            option
                .setName("station")
                .setDescription("🎶 Select your Radio Station!")
                .setRequired(true)
                .addChoices(
                    { name: "70's Hits", value: "radio70" },
                    { name: "80's Hits", value: "radio80" },
                    { name: "90's Hits", value: "radio90" },
                    { name: "Top #40 Hits Pop", value: "t40" },
                    { name: "R&B Hits", value: "rbhits" },
                    { name: "Classic Rock", value: "crock" },
                    { name: "Dubstep", value: "dubstep" },
                    { name: "LoFi", value: "lofi" },
                    { name: "Japanese Radio", value: "jp" },
                    { name: "Rap Radio", value: "rap" }
                )
        ),
    async run(client, interaction) {
        const radio = interaction.options.getString("station")
        await interaction.deferReply()
        const player = client.poru.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeaf: true
        });

        let rurl = "";

        switch (radio) {
            case "radio70":
                rurl = "http://radio.idjstream.com:15018/stream";
                break;
            case "radio80":
                rurl = "http://radio.idjstream.com:15020/stream";
                break;
            case "radio90":
                rurl = "http://radio.idjstream.com:15022/stream";
                break;
            case "t40":
                rurl = "http://radio.idjstream.com:15006/stream";
                break;
            case "rbhits":
                rurl = "http://radio.idjstream.com:15008/stream";
                break;
            case "crock":
                rurl = "http://radio.idjstream.com:15012/stream";
                break;
            case "dubstep":
                rurl = "http://radio.idjstream.com:15030/stream";
                break;
            case "lofi":
                rurl = "http://stream.dar.fm/154980"
                break;
            case "jp":
                rurl = "https://audio.misproductions.com/japan128k"
            break;
            case "rap":
                rurl = "http://stream.dar.fm/141073"
            break;    
        }

        const resolve = await client.poru.resolve(rurl)

        const { loadType, tracks, playlistInfo } = resolve;

        const track = tracks.shift();

        player.queue.add(track);

        if (player.isPlaying) {

            if (player.currentTrack.info.isStream) {
                return interaction.followUp({
                    content: `You can't put other streams in an Radio mode use \`/stop\` to stop the radio!`
                })
            }
            player.stop()
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`The Radio mode is enabled and playing ${radio}!`)
                        .setColor("Green")
                ]
            })
        } else {
            player.play()
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`The Radio is playing ${radio}!`)
                        .setColor("Green")
                ]
            })
        }

    }
}