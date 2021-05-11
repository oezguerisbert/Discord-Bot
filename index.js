//Bot Stuff and Stuff
const API_TOKEN = process.env.BOT_TOKEN
const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client()
const User = './userSchema.js'
const VERSION = 0.01

let b = -1;
let t = 0;

//Validating the Bot
client.login(API_TOKEN);

//Runs when YolkBot is Validated
client.on('ready', () => {
  console.log(`YolkBot Version ${VERSION} is now online`);
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Database with Repl
let i = 1
let vCIndex = 0
let joinedVC = []
//Prefix of every command
const prefix = "!";

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => { console.log("DB Connected") } ).catch(err => { console.log(`Database has encountered an error ${err}`) })
//Object for the different questions and such.
const newLobby = {
  shortDescription: "!newlobby: Make VC to Talk To Friends \n   ---Syntax: !newlobby {lobbyname} {expiration time}",
  longDescription: "*A quick way to create a voice channel for you and your friends!* Or if youre like me ***then youre a lonely fuck***! Kidding of course! :D \n **---Expires After Twenty Minutes , \n ---Syntax: !newlobby {lobbyname} {expiration time}**"
}
 
//When message
client.on("message", async message => {
  //Makes sure that person sending isnt a bot, and it must have a ! at the start for the bot to react in any way.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //Allowing there to be arguments in the commands ex: !command foo bar 
  const args = message.content
     .slice(prefix.length)
     .trim()
     .split(" ")
  const command = args.shift().toLowerCase();

  //Actual Commands and stuff now   
 
  if (command == "schedule") {  
    const messageUserID = message.author.id
    if (!args.length) {
      const embed = new MessageEmbed() 
      .setAuthor("ERR:INCORRECT-SYNTAX")
      .setColor(0xFD0D72)
      .setDescription("Correct Syntax Usages:\n how to find someones gaming schedule: !schedule @user \n How to make your own gaming schedule: !schedule create {time in PST example: '7:00PM' }")
      const sendEmbed = await message.channel.send(embed)
    } else if (args[0] == "create") {
      if (args[1] !== undefined) {
        const newDate = await args[1]
        console.log(messageUserID)
        console.log(newDate)
        const userDataCalender = new User ({
          userID: messageUserID,
          date: newDate,
        }).catch(err => {console.log(err)})
        userDataCalender.save()
        const userData = await MyModel.find({ userID: messageUserID })
        console.log(userData);
      } 
    }
  }
//Finished implementing the db, for some reason it doesnt save, fix that tommorow. 
if (command == "newlobby") {
  if (!args.length) {
    return message.channel.reply(`You didn't provide any arguments, ${message.author}! Syntax:  !newlobby {lobbyname: String} {expiration time, default 20 minutes: Int}`);
  }
  //Gets Args from the command
  let newLobbyName = args[0]
  let tTD = args[1]
  //Creates the 
  const newTeamChannel = await message.guild.channels.create(`Lobby-${newLobbyName}`, {
      type: 'voice',
  })   
  //
  const teamChannel = await message.guild.channels.cache.find(channel => channel.name === `Lobby-${newLobbyName}`);
  teamChannel.setParent("840322892977274890") 
  console.log()

  const sleepTime = tTD * 60 * 60 * 20

  message.react("👍")
  //if expire argument is there, send message and use the arg as the expire time for the VC
  if (tTD !== undefined) {
    console.log("Expire Input = True")
    const newVCEmbed = await new MessageEmbed()
    .setTitle("New Room Created Successfully")
    .setColor(0xa497f8)
    .setDescription(`Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${tTD} **Minutes***`)
      const sentMessage = message.channel.send(newVCEmbed).then(sentEmbed => {
    sentEmbed.react("✅")
    })
    await sleep(sleepTime)
    await teamChannel.delete()  
    const embedThing = new MessageEmbed() 
      .setAuthor("YolkBot")
      .setColor(0xa497f8)
      .setDescription("Successfully Deleted Voice Chat, Thank You For Using Our Services.")
      .setFooter("To use again, !newlobby {'title'} {expiretime}")
    const endMessage = await message.channel.send(embedThing)
    await sleep(10000)
    await endMessage.delete()
  // If no expire argument then it defaults to twenty minutes
  } else if (tTD === undefined) {
    tTD === 20
    console.log("Expire Input = false, defaulting to 20 minutes")
    const newVCEmbed = await new MessageEmbed()
    .setTitle("New Room Created Successfully")
    .setColor(0xa497f8)
    .setDescription(`Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n ***You did not put a designated time**, \n The default is 20. Enjoy, VC Expiring in 20 **Minutes***`)
    const sentMessage = message.channel.send(newVCEmbed).then(sentEmbed => {
    sentEmbed.react("✅")
    })
    await sleep(1000 * 60 * 20)
    await teamChannel.delete()
    const embedThing = new MessageEmbed() 
      .setAuthor("YolkBot")
      .setColor(0xa497f8)
      .setDescription("Successfully Deleted Voice Chat, Thank You For Using Our Services.")
      .setFooter("To use again, !newlobby {'title'} {expiretime}")
    const endMessage = await message.channel.send(embedThing)
    await sleep(10000)
    await endMessage.delete()
  }
  if (i = 0) 
  { 
    sentMessage.delete()
  }
  
      //Makes embed message of the team that was created,
    client.on('voiceStateUpdate', async (oldState, newState) => 
    {
      const coworkingvc = 839584284675276844
      const othervc = 102571251271258671 
      if (!newState.channel) 
      {  // Triggered if the user left a channel
        (`${newState.channel.member} Has Left The Lobby`)
      };

      if (newState.channelID !== coworkingvc) 
      {   // Triggered when the user joined the channel 
          if (!joinedVC.includes(newState.channel.member)) {
            i = i--
            joinedVC.push(newState.channel.member)
            console.log(newState.channel.member)
            const newVCEmbed = await new MessageEmbed()
            .setTitle("New Member")
            .setColor(0xa497f8)
            .setDescription(`Name: **${newState.channel.name}** \n\n\n Members: ${joinedVC}`)
            const newChannelMSG = message.channel.send(newVCEmbed)
            const channel = coworkingvc;
            i = i++
        } 
      }
    })  
  } 
})

client.on("message", async message => {
  
  //Makes sure that person sending isnt a bot, and it must have a ! at the start for it to react in any way.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //Allowing there to be arguments in the commands ex: !command foo bar 
  const args = message.content
     .slice(prefix.length)
     .trim()
     .split(" ")
  const command = args.shift().toLowerCase();

    //Actual Commands and stuff now   

  if (command == "help") {
    if (!args.length) {
      //New embed that returns when user doesnt put any extra arguments
      const embed = await new MessageEmbed()
      .setTitle("List Of Commands:")
      .setColor(0xFD0D72)
      .setDescription(`\n ${newLobby['shortDescription']} \n`)
      .setFooter("To View More In-Depth Explanations of The Commands, do \n !help {command}")
      message.channel.send(embed)
    } else if (args[0] === "newlobby" || args[0] === "!newlobby") {
      const embedLobbyNew = await new MessageEmbed() 
        .setTitle("!newlobby")
        .setColor(0xa497f8)
        .setDescription(newLobby['longDescription'])
      const embed = message.channel.send(embedLobbyNew)
    }
  }
}) 