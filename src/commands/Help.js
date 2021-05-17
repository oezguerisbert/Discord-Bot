const { MessageEmbed } = require("discord.js");
const { BOT_VERSION } = require("../utils/Constants");
const Descriptions = require("../descriptions.json");

module.exports = async ({ message, additional }) => {
  const [commandOption, ...options] = additional;
  if (!commandOption) {
    //New embed that returns when user doesnt put any extra arguments
    const helpEmbed = new MessageEmbed()
      .setAuthor(`YolkBot Version ${BOT_VERSION}`)
      .setTitle("List Of Commands:")
      .setColor(0xfd0d72)
      .setDescription(
        `\n\n ${Object.entries(Descriptions)
          .map(([command, { short }]) => `${command}: ${short} \n\n`)
          .join("")}`
      )
      .setFooter(
        "To View More In-Depth Explanations of The Commands, do \n !help {command}"
      );
    await message.channel.send(helpEmbed);
  } else {
    const co = commandOption.toLowerCase().replace("!", "");
    if (Object.keys(Descriptions).includes(co)) {
      const embedLobbyNew = new MessageEmbed()
        .setAuthor(`YolkBot Version ${BOT_VERSION}`)
        .setTitle(`!${co}`)
        .setColor(0xa497f8)
        .setDescription(Descriptions[co].long);
      await message.channel.send(embedLobbyNew);
    } else {
      const helpEmbed = new MessageEmbed()
        .setAuthor(`YolkBot Version ${BOT_VERSION}`)
        .setTitle("⚠ This command does not exist.")
        .setColor(0xfd0d72)
        .setDescription(
          `Available Commands: \n\n ${Object.keys(Descriptions)
            .map((command) => `"${command}"`)
            .join("\n ")}`
        )
        .setFooter(
          "To View More In-Depth Explanations of The Commands, do \n !help {command}"
        );
      await message.channel.send(helpEmbed);
    }
  }
};
