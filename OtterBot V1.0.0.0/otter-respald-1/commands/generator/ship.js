const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas')

module.exports = {
	name: 'ship',
	category: 'generator',
	descrption: 'make ship',
	usage: '(prefix)ship <user>',
	run: async(client, message, args) => {

		message.delete();

let user = message.mentions.users.first();//mencione a un usuario
    let aut = message.author;//el autor
    let random = Math.floor(Math.random() * 100);//meidor random hasta el 100%
    let img = "";//una variable vacia
    let palabras = "";


		if(!user) return message.channel.send('please mention someone to make the ship!')

		if(user == message.author) return message.channel.send("The ship just happened with 2 users... no yourself")

    if (random < 50) {//definimos la variable vacias con un objeto tipo string adentro
      img = "https://cdn.discordapp.com/emojis/767829331514753084.png?v=1";
      palabras = `
      <@${aut.id}>**amoung us is nothing, friends neither**<@${user.id}>`;
    } else if (random < 80) {
      img = "https://cdn.discordapp.com/emojis/767829547839258665.png?v=1";
      palabras = `<@${aut.id}>**only friends (:**<@${user.id}>`;
    } else if (random < 101) {
      img = "https://cdn.discordapp.com/emojis/767829273557729310.png?v=1";
      palabras = `<@${aut.id}>**I SHIPED IT :D**<@${user.id}>`;
    }

    const canvas = Canvas.createCanvas(450, 150);//creamos el canvas
    const ctx = canvas.getContext("2d");///2d
    const imagen1 = await Canvas.loadImage(user.displayAvatarURL({ dynamic: false, format: "png" }));//avatar del usuario mencionado
    const imagen2 = await Canvas.loadImage(aut.displayAvatarURL({ dynamic: false, format: "png" }));//avatar del author
    const panda = await Canvas.loadImage(img);
    ctx.drawImage(imagen1, 0, 0, 150, 150);
    ctx.drawImage(imagen2, 300, 0, 150, 150);
    ctx.drawImage(panda, 150, 0, 150, 150);

//posicionamos y tama�o

    const attach = new MessageAttachment(canvas.toBuffer(), "love.png");
    message.channel.send(`${palabras} \n\n:heartbeat:Probability:**${random}%**`, attach);
	}
}