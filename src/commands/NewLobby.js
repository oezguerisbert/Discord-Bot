const dotenv = require("dotenv");
const { MessageEmbed } = require("discord.js");
const sleep = require("../utils/sleep");
dotenv.config();
const DESIRED_LOCATION_FOR_VC = process.env.DESIRED_LOCATION_FOR_VC;

module.exports = async ({ client, message, additional }) => {
  const [commandOption, ...options] = additional;
  let i = 1;
  let joinedVC = [];

  if (!commandOption) {
    return message.channel.reply(
      `You didn't provide any arguments, ${message.author}! Syntax:  !newlobby {lobbyname: String} {expiration time, default 20 minutes: Int}`
    );
  }
  //Creates the Lobby
  await message.guild.channels.create(`Lobby-${commandOption}`, {
    type: "voice",
  });
  //
  const teamChannel = await message.guild.channels.cache.find(
    (channel) => channel.name === `Lobby-${newLobbyName}`
  );
  teamChannel.setParent(DESIRED_LOCATION_FOR_VC);

  const sleepTime = parseInt(options[0]) * 60 * 60 * 20;

  message.react("👍");
  //if expire argument is there, send message and use the arg as the expire time for the VC
  if (options[0] !== undefined) {
    console.log("Expire Input = True");
    const newVCEmbed = await new MessageEmbed()
      .setAuthor(`YolkBot Version: ${VERSION}`)
      .setTitle("New Room Created Successfully")
      .setColor(0xa497f8)
      .setDescription(
        `Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${options[0]} **Minutes***`
      );
    const sentEmbed = await message.channel.send(newVCEmbed);
    sentEmbed.react("✅");
    sentEmbed.delete({ timeout: 60_000 });
    await sleep(sleepTime); // not great but no idea how to make better, yet
    await teamChannel.delete();
    const embedThing = new MessageEmbed()
      .setAuthor(`YolkBot ${VERSION}`)
      .setColor(0xa497f8)
      .setDescription(
        "Successfully Deleted Voice Chat, Thank You For Using Our Services."
      )
      .setFooter("To use again, !newlobby {'title'} {expiretime}");
    await message.channel.send(embedThing).then((m) => {
      m.delete({ timeout: 10_000 });
    });
    // If no expire argument then it defaults to twenty minutes
  } else if (options[0] === undefined) {
    console.log("Expire Input = false, defaulting to 20 minutes");
    const newVCEmbed = await new MessageEmbed()
      .setAuthor(`YolkBot ${VERSION}`)
      .setTitle("New Room Created Successfully")
      .setColor(0xa497f8)
      .setDescription(
        `Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n ***You did not put a designated time**, \n The default is 20. Enjoy, VC Expiring in 20 **Minutes***`
      );
    (await message.channel.send(newVCEmbed)).react("✅");

    if (i == 0) {
      sentMessage.delete();
    }

    await sleep(1000 * 60 * 20);
    await teamChannel.delete();
    const embedThing = new MessageEmbed()
      .setAuthor(`YolkBot ${VERSION}`)
      .setColor(0xa497f8)
      .setDescription(
        "Successfully Deleted Voice Chat, Thank You For Using Our Services."
      )
      .setFooter(`To use again, !newlobby {'title'} {expiretime}`);
    await (await message.channel.send(embedThing)).delete({ timeout: 10_000 });
  }

  /*----------------------------------------------------------------*/
  /*------------------WHEN USER JOINS IT UPDATES -------------------*/
  /*----------------------------------------------------------------*/
  /*-------------WHEN USER LEAVES IT SEND AN EMBED -----------------*/
  /*----------------------------------------------------------------*/
  client.on("voiceStateUpdate", async (oldState, newState) => {
    const coworkingvc = 839584284675276844;
    const othervc = 102571251271258671;
    if (!newState.channel) {
      // Triggered if the user left a channel
      console.log(`${newState.channel.member} Has Left The Lobby`);
    }

    if (newState.channelID !== coworkingvc) {
      // Triggered when the user joined the channel
      if (!joinedVC.includes(newState.channel.member)) {
        i = i - 1;
        joinedVC.push(newState.channel.member);
        console.log(newState.channel.member);
        const newVCEmbed = await new MessageEmbed()
          .setTitle("New Member")
          .setColor(0xa497f8)
          .setDescription(
            `Name: **${newState.channel.name}** \n\n\n Members: ${joinedVC}`
          );
        await message.channel.send(newVCEmbed);
        // const channel = coworkingvc;
        i = i + 1;
      }
    }
  });
};
