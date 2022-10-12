const { Client, Collection, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [130815]
})
const fs = require('fs')
const { token, botID, nodes2, nodes, spotifyPlugin } = require('./src/config/config.json')
require('./src/utils/mongoose')()

//#region no-crash
process.on('unhandledRejection', error => {
    console.error(`[UNHANDLED ALARM] ${error}`.blue);
    console.log(error)
});

client.on('shardError', error => {
    console.error(`[SHARD ALARM] ${error}`.blue);
    console.log(error)
});
//#endregion no-crash

client.commands = new Collection();
client.cooldown = new Collection();

fs.readdir("./src/events/client", (err, files) => {
    if (err) console.error;
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./src/events/client/${f}`)
        let eName = f.split(".")[0]
        client.on(eName, event.bind(null, client))
        console.log(`${eName} Loaded!`)
    })
})

//#region lava poru
const { Poru } = require('poru')

client.poru = new Poru(client, nodes2, {
    spotify: {
        clientID: spotifyPlugin.clientID_sp,
        clientSecret: spotifyPlugin.secretClient_sp,
        playlistLimit: 5
    },
    apple: {
        playlistLimit: 5
    }
});

fs.readdir("./src/events/poru", (err, files) => {
    if (err) console.error;
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const poruEvent = require(`./src/events/poru/${f}`)
        let pName = f.split(".")[0]
        client.poru.on(pName, poruEvent.bind(null, client))
        console.log(`${pName} Launch!`)
    })
})
//#endregion lava poru

fs.readdirSync("./src/commands").forEach(category => {
    let cmd = fs.readdirSync(`./src/commands/${category}`).filter(f => f.endsWith(".js"))
    console.log(`Reading ${category}`)
    for (const file of cmd) {
        let cmd = require(`./src/commands/${category}/${file}`)
        client.commands.set(cmd.data.name, cmd)
    }
})

postSlash(token, botID)

client.login(token).catch(err => { console.log(err) })

function postSlash(botT, botId) {
    const { REST } = require('@discordjs/rest')
    const { Routes } = require('discord-api-types/v9')
    const commands = []

    fs.readdirSync(`./src/commands`).forEach(category => {
        const cmdS = fs.readdirSync(`./src/commands/${category}`).filter(f => f.endsWith(".js"))
        for (const obj of cmdS) {
            let sla = require(`./src/commands/${category}/${obj}`)
            commands.push(sla.data.toJSON())
        }
    });

    const rest = new REST({
        version: "10"
    }).setToken(botT)

    postSlashs()

    async function postSlashs() {
        try {
            await rest.put(
                Routes.applicationCommands(botID), {
                body: commands
            }
            )
            console.log("Commands Loaded!")
        } catch (err) {
            console.log(err)
        }
    }
}