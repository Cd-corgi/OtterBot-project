module.exports = (client) => {
    setInterval(() => {
        let status = [
            "🔴 Subscribe to Corgi, My creator",
            "Preparing nodes.",
            "🎶 Poru deployed",
            "📻 Live Radio Added!",
            "🦦 Send 'Otter' to my creator :)",
            "💛 my Ronny",
            "Otters Only"
        ]

        let rand = Math.floor(Math.random() * (status.length - 1) + 1);
        client.user.setActivity(`${status[rand]} | ${client.guilds.cache.size} Guilds & ${client.users.cache.size} users!`);
    }, 30000);
    console.clear()
    console.log(`${client.user.username} Ready!`)
    client.poru.init(client)
}