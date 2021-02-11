const { MessageEmbed } = require ('discord.js')
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
	name: 'GT',
	aliases: ['translate'],
	category: 'generator',
	description: 'make a transaltable text',
	usage: '(prefix)GT <language> <text>',
	run: async (client, message, args) => {
		const idioma = args[0];//Establecemos el argumento 0 como el idioma al que se traducira
const texto = args.slice(1).join(' ');//A partir del argumento 1 tomara el texto a traducir 
        
        if(!idioma){//Si no escribio el idioma de la manera correcta 
            return message.channel.send('define the language what do you want to translate!')
        }
        if(!texto) {//Si solamente escribio el idioma pero no el texto...
            return message.channel.send('What is the text to translate?')
        }
        
      
        translate(texto , { to: idioma }).then(res => {//Hacemos la función de la API que es la traducirá el texto al idioma que se especifico
            let embed = new MessageEmbed()//Me gusta usar embeds xd
            .setTitle('Translator')
            .addField('Text to translate:', texto)
            .addField('Translated text:', res.text)
            .setColor('BB8FCE')
            console.log(res.text);//Un console log por si las dudas
            message.channel.send(embed)//Se envia el embed
          }).catch(err => {
						message.channel.send(`:x: ${err}`);//En caso de haber un error en este caso seria introducir mal el lenguaje al que se traducirá 
          });
	}
}