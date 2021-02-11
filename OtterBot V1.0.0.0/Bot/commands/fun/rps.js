module.exports = {
	name: 'rps',
	category: 'fun',
	description: 'fight with the bot',
	usage: '(prefix)rps <r,p,s>',
	run: async(client, message, args) => {

		 if(!args[0]) return message.channel.send("Options: `rock (r)`, `paper (p)` or `scissors (s)`").then(m => m.delete({timeout: 10000})) //El .then() es opcional, yo siempre lo agrego porque me gusta.
  
  // Haremos una declaracion en matriz con las diferentes opciones ya dichas.
  let Options = ["r", "p", "s"]
  // Condicionamos la matriz con el metodo .includes() que nos va a determinar si lo que mandamos esta dentro de la matriz, si es si no devolvera true sino false.
  if(!Options.includes(args[0].toLowerCase())) return message.channel.send(":x: Incorrect option!")
  
  //Ahora empezamos a obtener las cosas de la matriz y condicionamos..
  
  // Si args[0] es igual a "piedra" (if(args[0] == <piedra/papel/tijera>) {})
  if(args[0] == "r") {

    // Creamos una condicional de matriz que tendra las respuestas.
    let random1 = ["I won! I choosed Paper and the paper cover rock", // Perdedor -jeje-
                   "You Wins! i choosed scissors and they cant cut rocks",  // Ganaste :D
                   "Draw!?!? Damn again (ÒnÓ)"] // Empate ._.

    // Enviamos el mensaje aplicando Math.random() que nos dara una respuesta aleatoria de la matriz.
    message.reply(" "+random1[Math.floor(Math.random() * random1.length)]+"")
    
    // Si no es "piedra", pero es "papel"
  } else if(args[0] == "p") {

    let random2 = ["I won! i choosed scissors and they can cut paper!.", // Perdedor -jeje-
                   "You Wins! i choosed paper and u cut me.",  // Ganaste :D
                   "Damn! again!."] // Empate ._.

    message.reply(" "+random2[Math.floor(Math.random() * random2.length)]+"")
    
  } else if(args[0] == "s") { 

		let random3 = ["I won! i choosed rock and i will smash u!",
		"You Wins! i choosed paper and i was been cuted!",
		"draw. AGAIN? SHUT UP FUCK UP!"]

		message.reply(" "+random3[Math.floor(Math.random() * random3.length)]+"")
	}
	}
}	