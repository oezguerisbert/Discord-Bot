const API_TOKEN = process.env.BOT_TOKEN
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client()
const fetch = require("node-fetch");
const app = require('express')();

const prefix = "!"; 

client.login(API_TOKEN);

client.on('ready', () => {
  console.log('I am ready!');
});

client.on("message", async message => {
  console.log("working possible")
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content
     .slice(prefix.length)
     .trim()
     .split(" ")
  const command = args.shift().toLowerCase();

  if (command == "apex") {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    const platform = args[0].toLowerCase()
    const username = args[1];
  }
})


//Express Server 




/*    const embed = new MessageEmbed()
      .setTitle('Haha hi bestie')
      .setColor(0xff0000)
      .setDescription('Yo astro is da bestie!');
    message.channel.send(embed);*/















