//Bot Stuff and Stuff
const dotenv = require("dotenv");
const { Client } = require("discord.js");
const CommandsHolder = require("./src/commands");
const { BOT_VERSION, COMMAND_PREFIX } = require("./src/utils/Constants");

dotenv.config();
const API_TOKEN = process.env.BOT_TOKEN;

const client = new Client();
client.login(API_TOKEN);

//Runs when YolkBot is Validated
client.on("ready", () => {
  console.log(`YolkBot Version ${BOT_VERSION} is now online`);

  client.on("message", async (message) => {
    //Makes sure that person sending isnt a bot, and it must have a ! at the start for the bot to react in any way.
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot)
      return;

    let [command, commandOption, ...options] = message.content
      .slice(COMMAND_PREFIX.length)
      .trim()
      .split(" ");

    //Actual Commands from `src/commands` and stuff now
    if (Object.keys(CommandsHolder).includes(command.toLowerCase())) {
      await CommandsHolder[command]({
        userid: message.author.id,
        client,
        message,
        additional: [commandOption, ...options],
      });
    }
  });
});
