# OtterBot Open Source project
Looking for inspiration? This is a cute and basic repo for you! A simple but great social and misc bot!

## Features and Functions! 🦦

* *.env Template*
```
TOKEN = "YOUR BOT TOKEN HERE"
PREFIX = "YOUR BOT PREFIX"
GOOGLE = "YOUR YOUTUBE APIV3 KEY HERE!"
```

* The db to the Prefix is **Mongoose** make sure creating a Shard to the bot!

## Reqs and Engine 📒

* Node.js v12 (and latest)
* **discord.js V12**

* and love of the dev UwU...


*Main Commands*
```
ottr.help | summon the main menu of the bot! with reactions integrated and explore the valid commands for you!
ottr.hug/kiss/kill <user> | send one of the mentioned function to interact with one user
ott.marry/divorce <user> || mentioned user: <yes /no> | a simple but cute Wedding system with Megadb
```

## How add commands there! ⭐

As the only one person who admin and control the Bot's behavior the way of add commands was changed a lot of times!

since the classic **if(message.content.startsWith(prefix + "ping"))** and being Command Handler! i'll show you how add it!

as a handler commands we should to make this following structure!

```
module.exports = {
   name: "ping",
   category: "subfolder",
   run: async(client, message, args) => {
    //Your command here !
   }
  }
```
Remember define your libs and more to dont get any trouble in the time to add the code!
The **async** method is optional and will be removed if the command do **not** need that function!

**When your command is structured well the console log will display it with an ASCII-TABLE npm**

**example:**

* *well done* loaded ✅

* *bad done*  Error, check the project and reload ❌

**Wanna more help?**
contact me as Coiny on Discord in [Break Space 2](https://discord.gg/JWajjNqVzz) 🧡

A cup of coffe make me more active and more happy! [Buy me a Coffee ☕](https://www.buymeacoffee.com/CorgiOtterBot)

## Disclamer ⚠

* This is a Open Source Repo, The commands is attached with an Open Source [License.md](https://github.com/Cd-corgi/OtterBot-OP-project/blob/main/LICENSE) <- more info there

* I'm **NOT** responsable about the use you give to this template or something else...

* Any Question, in the Commentaries you can send your question!

## Bot in Bot pages 🤖

* [☁ Top.gg](https://top.gg/bot/686245252717477966)

* [🤖 Discord Bots](https://discord.bots.gg/bots/686245252717477966)
