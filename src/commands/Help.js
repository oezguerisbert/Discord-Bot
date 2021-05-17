const { MessageEmbed } = require("discord.js");

//Object for the different questions and such.
const newLobby = {
  shortDescription: "!newlobby: Make VC to Talk To Friends",
  longDescription:
    "*A quick way to create a voice channel for you and your friends!* Or if youre like me ***then youre a lonely fuck***! Kidding of course! :D \n **---Expires After Twenty Minutes, \n ---Syntax: !newlobby {lobbyname} {expiration time}**",
};
const calender = {
  shortDescription:
    "!schedule: Make and/or check a Schedule For Your friends to Know When Your Free! All Date and Times are in PST",
  longDescription:
    "`!schedule: Make a Schedule For Your Friends That You Dont Have Know Your Online` \n Syntax to make a calender: `!schedule create {'M' 'T' 'W' 'TH' 'F' 'SAT' 'SUN'} {TIME: 7:00PM} \n To View Your Friends Calender, Please Use \n !schedule @user \n To Delete All Of Your Calenders, Please Use \n !schedule delete`",
};
const contributions = {
  shortDescription:
    "!contributions See The People That Made Me! (even though they are all pretty stupid!) I Wouldn't Be Here Without Them! Go Check Em Out!",
  longDescription:
    "!contributions View The Contributers That Helped Build YolkBot and Assisted During The Countless Errors Of Building Me, (im built different that's why ;)! I Appreciate you All For Helping Me Reach Aliveness, (even though life is pretty boring, now go spice it up and use some damn commands, so I dont feel useless. :D To Contribute To This Project And be Added To The List: http://github.com/Jac-Bo/Discord-Bot)",
};
module.exports = async ({ message, additional }) => {
  const [commandOption, ...options] = additional;
  if (!args.length) {
    //New embed that returns when user doesnt put any extra arguments
    const helpEmbed = new MessageEmbed()
      .setAuthor(`YolkBot Version ${VERSION}`)
      .setTitle("List Of Commands:")
      .setColor(0xfd0d72)
      .setDescription(
        `\n\n ${newLobby["shortDescription"]} \n\n ${calender["shortDescription"]} \n\n ${contributions["shortDescription"]}`
      )
      .setFooter(
        "To View More In-Depth Explanations of The Commands, do \n !help {command}"
      );
    await message.channel.send(helpEmbed);
  } else if (commandOption === "newlobby" || commandOption === "!newlobby") {
    const embedLobbyNew = new MessageEmbed()
      .setAuthor(`YolkBot Version ${VERSION}`)
      .setTitle("!newlobby")
      .setColor(0xa497f8)
      .setDescription(newLobby["longDescription"]);
    await message.channel.send(embedLobbyNew);
  } else if (args[0] === "schedule" || args[0] === "!schedule") {
    const embedLongDesc = new MessageEmbed()
      .setAuthor(`YolkBot Version ${VERSION}`)
      .setTitle("!schedule")
      .setColor(0xa497f8)
      .setDescription(calender["longDescription"]);
    await message.channel.send(embedLongDesc);
  } else if (args[0] === "contributions" || args[0] === "!contributions") {
    const embedContributionsHelp = new MessageEmbed()
      .setAuthor(`YolkBot Version ${VERSION}`)
      .setTitle("!schedule")
      .setColor(0xa497f8)
      .setDescription(contributions["longDescription"]);
    message.channel.send(embedContributionsHelp).then((m) => {
      m.delete({ timeout: 150_000 });
    });
  }
};
