module.exports = {
name: 'ttt',
category: 'fun',
description: 'play tictactoe',
usage: '(prefix)ttt <user>',
run: async(client, message, args) => {
	const tresenraya = require('tresenraya');// npm i tresenraya , Descarguen eso en su cmd
 
const usuario = message.mentions.users.first();
if(!usuario) return message.channel.send('Ping someone'); // Si el autor no menciono a nadie retorna este mensaje
if(usuario.bot) return message.channel.send('The bots cant play')// Si el autor menciona a un bot retorna este mensaje
if(message.author.id == usuario.id) return message.channel.send('You cant play alone') // Si el autor se menciono a si mismo retorna este mensaje
const partida = new tresenraya.partida({ jugadores: [message.author.id, usuario.id] });
  
partida.on('ganador', (jugador, tablero, paso) => { // cuando encuentra a algún ganador se emite el evento 'ganador'
    
  message.channel.send('The winner is ' + client.users.cache.get(jugador).username + ' in this match! after `' + paso + ' steps.`\n\n' + tablero.string + '\n\nsorry, ' + client.users.cache.get(partida.perdedor).username + '... 😦');
    
});
  
partida.on('empate', (jugadores, tablero, paso) => { // si se produce un empate se emite el evento 'empate'
    
  message.channel.send('A draw appeared in ' + jugadores.map(x => client.users.cache.get(x).username).join(' and ') + '!');
    
});
  
message.channel.send('start ' + client.users.cache.get(partida.turno.jugador).username + ', Choose a number beteew 1 and 9 [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
 
const colector = message.channel.createMessageCollector(msg => msg.author.id === partida.turno.jugador && !isNaN(msg.content) && (Number(msg.content) >= 1 && Number(msg.content) <= 9) && partida.disponible(msg.content) && !partida.finalizado);
 
colector.on('collect', (msg) => {
      
  partida.elegir(msg.content); // elegir la posición dependiendo del contenido del mensaje recolectado
  
  if(partida.finalizado) {
    
    colector.stop();
    return;
    
  } // si la partida ya ha finalizado (ya sea por que alguien ha ganado o ha habido un empate), para el colector y retorna nada
      
  message.channel.send('is turn for ' + client.users.cache.get(partida.turno.jugador).username + ' [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
      
		});
	}

}	