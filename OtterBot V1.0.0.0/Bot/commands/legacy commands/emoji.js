const Discord = require('discord.js')

module.exports = {
	name: 'emoji',
	category: 'legacy commands',
	description: 'show how emojis are joined!',
	usage: '(prefix)emoji',
	run: async (client, message, args) => {
		if(message.guild.emojis.cache.size < 1) return message.channel.send('`This server has not emojis!`')
/* Declaramos emojis y emojis_a como arrays vaciós, emojis será para emojis normales y emojis_a para los animados */
let emojis = []
let emojis_a = []
/* Filtramos los emojis que no son animados para mapearlos y pushearlos al array emojis */
message.guild.emojis.cache.filter(x => !x.animated).map(x => emojis.push(`<:${x.name}:${x.id}>`))
/* Filtramos los emojis que son animados para mapearlos y pushearlos al array emojis_a */
message.guild.emojis.cache.filter(x => x.animated).map(x => emojis_a.push(`<a:${x.name}:${x.id}>`))
/* 
Enviamos el mensaje y lo guardamos en una variable, esto es lo mismo que utilizar send("algo").then(m => {
  //Código
}) pero resumido, recuerden que para utilizar await deben estar en una función asincrona
*/
let m = await message.channel.send({embed: { 
  title: `Emojis from ${message.guild.name}`, 
  color: 'RANDOM', 
  fields: [{ 
    name: 'Static Emojis:',
    value: emojis[0] ? emojis.slice(0, 10).join('\n') : 'This server has not Static emojis!'
    /*
    Utilizamos un operador ternario (condición ? true : false) para verificar que haya algún elemento
    en el array emojis, Si hay tomaremos los primeros 10 elementos y los uniremos, en caso contrario
    el valor del field será 'Este servidor no tiene emojis estaticos'
    */
  },
  {
    name: 'Animated emojis!:',
    value: emojis_a[0] ? emojis_a.slice(0, 10).join('\n') : 'This server has not animated emojis'
    /*
    Utilizamos un operador ternario (condición ? true : false) para verificar que haya algún elemento
    en el array emojis_a, Si hay tomaremos los primeros 10 elementos y los uniremos, en caso contrario
    el valor del field será 'Este servidor no tiene emojis animados'
    */
  }],
  author: {
    name: `Requested by: ${message.author.tag}`,
    icon_url: message.author.displayAvatarURL()
  }
}})
  /*
  Reaccionamos al mensaje con los emojis que se utilizarán para cambiar de página y detener el comando
  Utilizamos await para que se reaccione en orden, recordar que para usarlo deben estar en una función asincrona
  */
  await m.react('◀️')
  await m.react('⏹️')
  await m.react('▶️')
  /* Declaramos i como 0 y i2 como 10 para utilizarlos luego */
  let i = 0;
  let i2 = 10;
  /*
  Hacemos un filtro que verifica si el nombre del emoji con el que se reacciono es uno de los del array
  y el usuario que reacciono es el autor del mensaje
  */
  let filtro = (reaction, user) => ['◀️','⏹️','▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
  /* 
  Creamos el colector y añadimos el filtro declarado anteriormente además de las opciones time y max
  time vendría siendo el tiempo que tendrá el usuario para reaccionar y max la cantidad de veces que cambiaremos
  de página, en mi caso para time coloco 1 minuto y para el max 10
  Recuerda que time debe ser milisegundos (1000 = 1 segundo)
  Más opciones en; https://discord.js.org/#/docs/main/stable/typedef/ReactionCollectorOptions
  */
  let colector = m.createReactionCollector(filtro, {time: 60000, max: 10});
  /* Recibimos la reacción con el evento 'collect' */
  colector.on('collect', reaction => {
    /*
    En mi caso utilizaré la estructura switch case dado que me parece más cómodo, puedes
    utilizar condicionales y conseguirás el mismo resultado
    */
    switch(reaction.emoji.name){ 
      /* En caso de que el nombre de la reacción sea igual a la flechita mirando a la izquierda */
      case "◀️":
      /* 
      Validamos que i sea mayor a 1, en caso de que la página sea la 1ra 1 será 0 por lo que no pasará
      esta condicional
      */
      if(i > 1){
      /* Restamos 10 a i y i2 */
      i-=10
      i2-=10
      /* Editamos el mensaje para hacer la ilusión de pasar de página */
      m.edit({embed: {
        title: `Emojis from ${message.guild.name}`, 
        color: 'RANDOM', 
        fields: [{ 
          name: 'Static Emojis:',
          /* Esto ya fue explicado previamente, si no entiendes retrocede */
          value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'This server has not Static Emojis'
        },
        {
          name: 'Animated emojis!:',
          /* Esto ya fue explicado previamente, si no entiendes retrocede */
          value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'This server has not Animated emojis'
        }],
        author: {
          name: `Requested by: ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      }})      
      }
      /* Rompemos */
      break;
      /* En caso de que el nombre de la reacción sea igual al cuadradito feo este */
      case "⏹️":
      /* Paramos el colector para que no se pueda seguir pasando de página */
      colector.stop()
      /* Rompemos */
      break;
      /* En caso de que el nombre de la reacción sea igual a la flecha mirando a la derecha */
      case "▶️":
      /*
      Verificamos que el ultimo elemento de la página sea diferente al ultimo elemento del array entero
      (Gracias AndreMor por responderme en #ayuda-iniciante <3)
      */
      if(emojis.slice(i, i2+1)[emojis.slice(i, i2+1).length - 1] !== emojis[emojis.length-1]){
      /* Sumamos 10 a i y i2 */
      i+=10
      i2+=10
      /* Editamos el mensaje para hacer la ilusión de pasar de página */
      m.edit({embed: {
        title: `Emojis de ${message.guild.name}`, 
        color: 'RANDOM', 
        fields: [{ 
          name: 'Emojis estaticos:',
          /* Esto ya fue explicado previamente, si no entiendes retrocede */
          value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'Este servidor no tiene emojis estaticos'
        },
        {
          name: 'Emojis animados:',
          /* Esto ya fue explicado previamente, si no entiendes retrocede */
          value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'Este servidor no tiene emojis animados'
        }],
        author: {
          name: `Pedido por: ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      }})      
      }
      break; /* Rompemos */
    }
  })
	}
}