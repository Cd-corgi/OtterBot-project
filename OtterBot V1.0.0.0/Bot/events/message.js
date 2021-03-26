module.exports = async (client, message) => {
    if (message.author.bot) return;

		



    const prefix = process.env.PREFIX;

    if (!message.guild) return;
	


    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return message.channel.send('please write a command!');
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));


		
    
    if (command)
        command.run(client, message, args);




				
};
