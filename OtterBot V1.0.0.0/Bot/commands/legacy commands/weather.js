const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')

module.exports = {
	name: 'weather',
	category: 'legacy commands',
	description: 'know the city weather',
	usage: '(prefix)weather <city>',
	run: async(client, message, args) => {

		let city = args.slice(0).join(" ");

		let degreeType = "C";

		await weather.find({search: city, degreeType: degreeType}, function(err, result) {
			if(!city) return message.channel.send('`Please insert a location!`');
			if (err || result === undefined || result.length === 0) return message.channel.send("`Unknow location. Insert a valid location!`");

			let current = result[0].current;
			let location = result[0].location;

			const weathermbed = new MessageEmbed()
			.setAuthor(current.observationpoint)
			.setDescription(`The current status of the weather is ${current.skytext}`)
			.setThumbnail(current.imageUrl)
			.setTimestamp()
			.setColor("RANDOM")
			.addField("Latitude", location.lat, true)
			.addField("longitude", location.long, true)
			.addField("Feels like", `${current.feelslike}° Degrees`, true)
			.addField("Degree Type", location.degreetype, true)
			.addField("Wind", current.winddisplay, true)
			.addField("Humidity", `${current.humidity}%`, true)
			.addField("Timezone", `GMT ${location.timezone}`, true)
			.addField("Temperature", `${current.temperature}° Degrees`, true)
			.addField("Observation Time", current.observationtime, true)
			.setFooter("Powered by Weather-js | OtterBot")

			return message.channel.send(weathermbed).catch(err => {
				message.channel.send(err)
			})


		})


	}
}