module.exports = {
	name: 'impostor',
	category: 'fun',
	description: 'make the user making the impostor',
	usage: '(prefix)impostor <mention>',
	run: (client, message, args) => {
			const mencionado = message.mentions.members.first() //Definimos mencionado

let random = [
"Was not an impostor",
"Was an impostor"
] //Hacemos frases para ver si es o no


if(!mencionado)//Si el autor no menciono a nadie

 return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${message.author.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostors left 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`) //Enviamos el mensaje

//Pero si menciona

message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${mencionado.user.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostors left 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`)

	}
}