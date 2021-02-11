const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "welcome",
  category: "Admin",
  usage: "(prefix)welcome delete/<#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    	let perms = message.member.hasPermission("ADMINISTRATOR");


	if(!perms) {
		const Nop = new Discord.MessageEmbed()
		.setAuthor(message.author.username)
		.setColor("RED")
		.setDescription("`YOU HAVE NOT PERMISSIONS TO DO THIS COMMAND`")
		message.channel.send(Nop)
		return Nop
	}

    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      message.channel.send("The channel is not mentioned")
			
			return
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id) //set id in var
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
		
	
	 //send success message
  }
}