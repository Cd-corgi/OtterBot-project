const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    permissions: [PermissionFlagsBits.Connect],
    botp: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak],
    inVoiceChannel: true,
    checkLive: true,
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("test the music bro")
        .addStringOption(option =>
            option
                .setName("song")
                .setDescription("Provide the URL or name of the song!")
                .setRequired(true)),
    async run(client, interaction) {
        const query = interaction.options.getString("song")

        const player = client.poru.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeaf: true
        });
        const resolve = await client.poru.resolve(query, 'spotify')
        const { loadType, tracks, playlistInfo } = resolve;

        await interaction.deferReply();

        if (loadType === 'NO_MATCHES') return interaction.followUp("No match songs result found!");

        if (loadType === 'PLAYLIST_LOADED') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.user;
                player.queue.add(track);
            }
            if (!player.isPlaying && !player.isPaused) player.play();
            const embed1 = new EmbedBuilder()
                .setTitle("Added To Queue")
                .setColor("Red")
                .setDescription(`[${playlistInfo.name}](https://discord.gg/UF4zErDJzD)`)
            return interaction.followUp({ embeds: [embed1] }).then(() => setTimeout(() => interaction.deleteReply(), 5000));
        } else {

            if (tracks.length === 0) return interaction.followUp("no songs found!");
            // track.info?.requester = interaction.user;
            let track = tracks.shift()
            track.info.requester = interaction.user
            // tracks[0].info.requester = interaction.user;
            player.queue.add(track);

            if (!player.isPlaying && !player.isPaused) player.play();
            const embed2 = new EmbedBuilder()
                .setTitle("Added To Queue")
                .setColor("Red")
                .setDescription(`[${track.info.title}](${track.info.uri})`)
            return interaction.followUp({ embeds: [embed2] });
        }
    }
}