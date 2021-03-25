

const { APIMessage, Client, MessageEmbed, Collection } = require('discord.js')

const client = new Client({ disableMentions: 'everyone' });

const { config } = require('dotenv')

const fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();


 
 client.categories = fs.readdirSync('./commands/');

config({
    path: `${__dirname}/.env`
});

 let prefix = process.env.PREFIX;

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});


client.login(process.env.TOKEN).then(() => { 
    console.log(`Estoy listo, soy ${client.user.tag}, conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);

  })
  .catch((err) => {

    //Si se produce un error al iniciar sesión, se le indicará en la consola.
    console.error("Error al iniciar sesión: " + err);

  });

	
