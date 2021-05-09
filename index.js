//Bot Stuff and Stuff
const API_TOKEN = process.env.BOT_TOKEN
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client()
const VERSION = 0.01

//Database with Repl
const Database = require("@replit/database")
let vCIndex = 0
const db = new Database()

//Prefix of every command
const prefix = "!";
const newLobby = {

  shortDescription: " Make VC to Talk To Friends, Expires After One Hour \n Syntax: !newlobby <lobbyname>",
  
  longDescription: "A quick way to create a voice channel for you and your friends! Or if youre like me then youre a lonely fuck! But I digress, \n Syntax: !newlobby <lobbyname>"
  
}
console.log(newLobby['shortDescription'])
const commands = []
//Validating the Bot
client.login(API_TOKEN);


//Runs when YolkBot is Validated
client.on('ready', () => {
  console.log(`YolkBot Version ${VERSION} is now online`);
});

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
      const embed = new MessageEmbed()
      .setTitle("List Of Commands:")
      .setColor(0xFD0D72)
      .setDescription(`Apex: \n  ${newLobby['shortDescription']}`)
      message.channel.send(embed)
    }
  }


//Create new apex voice lobby command
if (command == "newlobby") {
  if (!args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}! Syntax < !newlobby {lobbyname} >`);
  }
  //Gets Args from the command
  const newLobbyName = args[0]
  
  //Who's In The Team?
  const members = [message.author, ]
  
  //New Team Role 
  const customCreatedRole = message.guild.roles.create({
    data: {
      name: newLobbyName,
      color: "RED",
    }
  
  }).then(async (role) => {   
  //   const roleCreated = customCreatedRole.data.name;
  // console.log(roleCreated)
  console.log(role.name.id)
    vCIndex == ++vCIndex
    db.set(customCreatedRole, {
      name: role.name.id,
      id: vCIndex
    })
    db.get(customCreatedRole).then((data) => {
      console.log(data)
    })
    
    console.log(vCIndex)
    const newTeamChannel = await message.guild.channels.create(`Lobby-${newLobbyName}`, {
      type: 'voice',
  })   

  const teamChannel = await message.guild.channels.cache.find(channel => channel.name === `Lobby-${newLobbyName}`);
  teamChannel.setParent("840322892977274890") 

  //Makes embed message of the team that was created,
  const newChannelEmbed = await new MessageEmbed()
    .setTitle("New Room Created Successfully")
    .setColor()
    .setDescription(`Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n Members: ${members} \n\n React To This Message To Join The Team`)
  //Sends embed, and reacts to it, will be used later.
  message.channel.send(newChannelEmbed).then(sentEmbed => {
    sentEmbed.react("✅")
  })
  message.react("👍")
  // newChannelEmbed.awaitReactions(Filter, {max: 4, time: 60000, errors: ["time"]}).then(collected => {
  //   //Want to update embed message/edit it,, append the new user in vc to it
  //   })
  // })
  client.on('voiceStateUpdate', async (oldState, newState) => {
  
    if (!newState.channel || !newState.member) {  // Triggered if the user left a channel
      member.roles.remove(newLobbyName) //This is where i left off, going to make it so when u join the team channel you get a role and when u leave it removes it.
    };
    // const testChannel = newState.guild.channels.cache.find(c => c.name === newVC);
    if (newState.channelID === testChannel.id) { // Triggered when the user joined the channel we tested for
        if (!newState.member.roles.cache.has(newLobbyName)) newState.member.roles.add(newLobbyName); // Add the role to the user if they don't already havit
      }
    })
  });    
  }
})
    

//To do, create voice chats for apex gaming, also add roles to the player who said it, and players who react to the message. then also 

