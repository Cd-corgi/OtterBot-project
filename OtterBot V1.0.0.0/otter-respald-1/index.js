

const { APIMessage, Client, MessageEmbed, Collection } = require('discord.js')

const client = new Client({ disableMentions: 'everyone' });

const { config } = require('dotenv')

const { getPokemon } = require('./utils/pokemon');

const db = require("quick.db") //using quick.db package

const fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');


const mongoose = require('mongoose');


 
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


	

client.on("guildMemberAdd", (member) => {
	
	
	let phrase = [
		`Is not a bird, is not a plane, is ***${member.user.username}***!`,
		'your precense make our members happy!',
		`${member.user.username}, you have come with a new toy!`,
		'STONKS! a good user appeared!'
		] //usage of welcome event
  
	
	let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(chx === null) { //check if var have value or not
    return;
  }

  let wembed = new MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("RANDOM")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`Welcome to ${member.guild.name}! ${phrase[Math.floor(phrase.length * Math.random())]}`);
  
  client.channels.cache.get(chx).send(wembed) //get channel and send embed
})






client.on("message", async message => {
    const Guild = require('./models/guild');
		const mongoose = require('mongoose');
		
		if(message.author.bot) return;

		const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: process.env.PREFIX
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
        }
    });

		const prefix = settings.prefix;

    if(message.content.toLowerCase().startsWith((prefix) + 'pokemon')) {
        const pokemon = message.content.split(" ")[1];
        const pokeData = await getPokemon(pokemon);
        const { sprites, stats, weight, name, id, base_experience } = pokeData;
        const embed = new MessageEmbed();
        embed.setTitle(`${name} #${id}`)
        embed.setThumbnail(`${sprites.front_default}`);
        stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
        embed.addField('weight', weight, true);
        embed.addField(`Base Experience`, base_experience, true);
        message.channel.send(embed);
        
    }
});

client.mongoose.init();
client.login(process.env.TOKEN).then(() => { 
    console.log(`Estoy listo, soy ${client.user.tag}, conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);

  })
  .catch((err) => {

    //Si se produce un error al iniciar sesión, se le indicará en la consola.
    console.error("Error al iniciar sesión: " + err);

  });

	