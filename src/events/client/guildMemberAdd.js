const WSchema = require('../../models/welcome')
const Canvas = require('canvas')
const Discord = require('discord.js')

module.exports = async (client, member, guild) => {
    WSchema.findOne({ guildID: member.guild.id }, async (err, data) => {
        if (err) throw err;
        if (!data) {
            return;
        } else {
            const chan = member.guild.channels.cache.get(data.channelID);
            const msg = data.welMessage || `Welcome to ${member.guild.name}, ${member.user}`;
            const img = data.welImage;

            const Canvas = require('canvas')

            var WelcomeCanvas = {};

            WelcomeCanvas.create = Canvas.createCanvas(1024, 500)
            WelcomeCanvas.context = WelcomeCanvas.create.getContext('2d')
            WelcomeCanvas.context.font = '72px sans-serif'
            WelcomeCanvas.context.fillStyle = `#${data.welTextColor}`
            WelcomeCanvas.context.fillText("WELCOME", 340, 360);
            await Canvas.loadImage(`${data.welImage}`).then(async img => {
                WelcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
                WelcomeCanvas.context.fillText("Welcome", 340, 360);
                WelcomeCanvas.context.beginPath();
                WelcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
                WelcomeCanvas.context.stroke()
                WelcomeCanvas.context.fill()
                WelcomeCanvas.context.closePath();
            })

            let canvas = WelcomeCanvas;

            canvas.context.font = "42px sans-serif"
            canvas.context.textAlign = 'center'
            canvas.context.font = '29px sans-serif'
            canvas.context.fillText(member.user.tag.toUpperCase(), 507, 410)
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
            canvas.context.font = '32px sans-serif'
            canvas.context.fillText(`Member ${member.guild.memberCount}th`, 507, 455)
            canvas.context.beginPath()
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
            canvas.context.closePath()
            canvas.context.clip()
            await Canvas.loadImage(member.user.displayAvatarURL({ size: 1024, extension: 'png' }))
                .then(img => { canvas.context.drawImage(img, 393, 47, 238, 238) })
            let atch = new Discord.AttachmentBuilder(canvas.create.toBuffer(), { name: `welcome${member.user.id}.png` })

            chan.send({
                content: `${msg}`,
                files: [atch]
            })
        }
    })
}