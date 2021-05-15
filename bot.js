//Bot Stuff and Stuff
const dotenv = require("dotenv");
dotenv.config();
const API_TOKEN = process.env.BOT_TOKEN;
const axios = require("axios");
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client();
const User = "./userSchema.js";
const VERSION = 0.5;

let b = -1;
let t = 0;

//Validating the Bot
client.login(API_TOKEN);

//Runs when YolkBot is Validated
client.on("ready", () => {
  console.log(`YolkBot Version ${VERSION} is now online`);
});
//Random Functions because Otzi Told me to
function getUserFromMention(mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let i = 1;
let vCIndex = 0;
let joinedVC = [];

//Prefix of every command
const prefix = "!";

//Object for the different questions and such.
const newLobby = {
  shortDescription: 
    "!newlobby: Make VC to Talk To Friends",
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
    "!contributions View The Contributers That Helped Build YolkBot and Assisted During The Countless Errors Of Building Me, (im built different that's why ;)! I Appreciate you All For Helping Me Reach Aliveness, (even though life is pretty boring, now go spice it up and use some damn commands, so I dont feel useless. :D)"
}
/*=======================================================================================================================================================*/
//When message
client.on("message", async (message) => {
  DOTW = ["M", "T", "W", "TH", "F", "SA", "SU"];
  //Makes sure that person sending isnt a bot, and it must have a ! at the start for the bot to react in any way.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //Allowing there to be arguments in the commands ex: !command foo bar
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  /*------------------------------*/
  //Get Data From DB
  async function getData(id) {
    await axios
      .get("http://localhost:4000/accounts", { params: { UserID: id } })
      .then((responseData) => {
        const parsed = responseData.data
          .map((row) => `Date: ${row.CalenderDate}, Time: ${row.CalenderTime}`)
          .join("\n\n");
        const userDataEmbed = new MessageEmbed()
          .setAuthor(`YolkBot Version: ${VERSION}`)
          .setDescription(`${parsed}`);
        message.channel.send(userDataEmbed);
      });
  }
  //Post Data To DB
  async function postData(id, date, time) {
    await axios
      .post("http://localhost:4000/", {
        CalenderDate: date,
        CalenderTime: time,
        UserID: id,
      })
      .then((responseData) => {
        const embedDataUser = new MessageEmbed()
          .setAuthor(`YolkBot Version: ${VERSION}`)
          .setDescription(`***Your Data is Now*** ___Updated___`);
        message.channel.send(embedDataUser).then((m) => {
          m.delete({ timeout: 60000 });
        });
      });
  }

  //Delete Data
  async function deleteData(id) {
    await axios
      .delete("http://localhost:4000/accounts", { data: { UserID: id } })
      .then(() => {
        const sentMessage = new MessageEmbed()
          .setAuthor(`YolkBot ${VERSION}`)
          .setTitle("Successfully Deleted All Scheduling Data")
          .setColor(0xa497f8)
          .setDescription(
            `If You Would Like To Add Another Schedule, Please Use The \n !schedule {create, delete} {day of week: "M", "T" "W" "TH" "F" "S" "SU"}\n Command `
          ); 
        message.channel.send(sentMessage).then((m) => {
          m.delete({ timeout: 60000 });
          return;
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  //Actual Commands and stuff now

  if (command == "schedule") {
    const messageUserID = message.author.id;
    if (args[0] == "create") {
      if (args[1] !== undefined) {
        let newDate = await args[1];
        let newTime = await args[2];
        postData(messageUserID, newDate, newTime);
        
        if (newTime == undefined) {
          let errEmbed = new MessageEmbed()
            .setAuthor(
              `YolkBot Version: ${VERSION} \n SYNTAX_ERR: DATE EXPECTED, GOT ${newTime}`
            )
            .setDescription(`You Must Specify a Valid Time To Schedule`);
          message.channel.send(errEmbed).then((m) => {
            m.delete({ timeout: 30000 });
          });
          return;
        }
      }
    }
    if (args[0] == "delete") {
      //Deletes Schedule Data
      deleteData(message.author.id);
    } 
    if (args[0]) {
      const user = getUserFromMention(args[0]).id;
      console.log(user);
      getData(user);
    }
  }
  

  if (command == "newlobby") {
    if (!args.length) {
      return message.channel.reply(
        `You didn't provide any arguments, ${message.author}! Syntax:  !newlobby {lobbyname: String} {expiration time, default 20 minutes: Int}`
      );
    }
    //Gets Args from the command
    let newLobbyName = args[0];
    let tTD = args[1];
    //Creates the
    const newTeamChannel = await message.guild.channels.create(
      `Lobby-${newLobbyName}`,
      {
        type: "voice",
      }
    );
    //
    const teamChannel = await message.guild.channels.cache.find(
      (channel) => channel.name === `Lobby-${newLobbyName}`
    );
    teamChannel.setParent("840322892977274890");
    console.log();

    const sleepTime = tTD * 60 * 60 * 20;

    message.react("👍");
    //if expire argument is there, send message and use the arg as the expire time for the VC
    if (tTD !== undefined) {
      console.log("Expire Input = True");
      const newVCEmbed = await new MessageEmbed()
        .setAuthor(`YolkBot Version: ${VERSION}`)
        .setTitle("New Room Created Successfully")
        .setColor(0xa497f8)
        .setDescription(
          `Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n *Enjoy, VC Expiring in ${tTD} **Minutes***`
        );
      const sentMessage = message.channel
        .send(newVCEmbed)
        .then((sentEmbed) => {
          sentEmbed.react("✅"); sentEmbed.delete({timeout: 60000})
        });
      await sleep(sleepTime);
      await teamChannel.delete();
      const embedThing = new MessageEmbed()
        .setAuthor(`YolkBot ${VERSION}`)
        .setColor(0xa497f8)
        .setDescription(
          "Successfully Deleted Voice Chat, Thank You For Using Our Services."
        )
        .setFooter("To use again, !newlobby {'title'} {expiretime}");
      const endMessage = await message.channel.send(embedThing).then((m) => {
        m.delete({ timeout: 10000 });
      });
      // If no expire argument then it defaults to twenty minutes
    } else if (tTD === undefined) {
      tTD === 20;
      console.log("Expire Input = false, defaulting to 20 minutes");
      const newVCEmbed = await new MessageEmbed()
        .setAuthor(`YolkBot ${VERSION}`)
        .setTitle("New Room Created Successfully")
        .setColor(0xa497f8)
        .setDescription(
          `Name: **${newLobbyName}** \n\n\n *Creator*: ${message.author} \n\n ***You did not put a designated time**, \n The default is 20. Enjoy, VC Expiring in 20 **Minutes***`
        );
      const sentMessage = message.channel.send(newVCEmbed).then((sentEmbed) => {
        sentEmbed.react("✅");
      });
      if ((i = 0)) {
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
      const endMessage = await message.channel.send(embedThing);
      await sleep(10000);
      await endMessage.delete();
    }

    /*----------------------------------------------------------------*/
    /*------------------WHEN USER JOINS IT UPDATES -------------------*/
    /*-------------WHEN USER LEAVES IT SEND AN EMBED -----------------*/
    /*----------------------------------------------------------------*/
    client.on("voiceStateUpdate", async (oldState, newState) => {
      const coworkingvc = 839584284675276844;
      const othervc = 102571251271258671;
      if (!newState.channel) {
        // Triggered if the user left a channel
        `${newState.channel.member} Has Left The Lobby`;
      }

      if (newState.channelID !== coworkingvc) {
        // Triggered when the user joined the channel
        if (!joinedVC.includes(newState.channel.member)) {
          i = i--;
          joinedVC.push(newState.channel.member);
          console.log(newState.channel.member);
          const newVCEmbed = await new MessageEmbed()
            .setTitle("New Member")
            .setColor(0xa497f8)
            .setDescription(
              `Name: **${newState.channel.name}** \n\n\n Members: ${joinedVC}`
            );
          const newChannelMSG = message.channel.send(newVCEmbed);
          const channel = coworkingvc;
          i = i++;
        }
      }
    });
  }
});

/*----------------------------------------------------------------*/
/*-----------------------------HELP COMMANDS----------------------*/
/*----------------------------------------------------------------*/

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //Allowing there to be arguments in the commands ex: !command foo bar
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  if (command === "contributions") {
    const embedContributions = await new MessageEmbed().setAuthor(`YolkBot Version: ${VERSION}\n Contributions:`).setDescription(`Lead Developer: JacBo__ \n Side Contributors: Otzi, Bread, Vyngaard`).setColor(0xa497f8).setFooter("Thank You To Everyone Who Has Contributed To This Project \n On Bashbunni's Server, I am Much Appreciative -Yolk")
    message.channel.send(embedContributions).then(m => {m.delete({ timeout: 50000})})}
  if (command == "help") {
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
      message.channel.send(helpEmbed);
    } else if (args[0] === "newlobby" || args[0] === "!newlobby") {
      const embedLobbyNew = await new MessageEmbed()
        .setAuthor(`YolkBot Version ${VERSION}`)
        .setTitle("!newlobby")
        .setColor(0xa497f8)
        .setDescription(newLobby["longDescription"]);
      const LongEmbedDesc = message.channel.send(embedLobbyNew);
    } else if (args[0] === "schedule" || args[0] === "!schedule") {
      const embedLongDesc = await new MessageEmbed()
        .setAuthor(`YolkBot Version ${VERSION}`)
        .setTitle("!schedule")
        .setColor(0xa497f8)
        .setDescription(calender["longDescription"]);
      message.channel.send(embedLongDesc);
    } else if (args[0] === "contributions" || args[0] === "!contributions") {
      const embedContributionsHelp = new MessageEmbed()
      .setAuthor(`YolkBot Version ${VERSION}`)
      .setTitle("!schedule")
      .setColor(0xa497f8)
      .setDescription(contributions["longDescription"]);
      message.channel.send(embedContributionsHelp).then(m => {m.delete({timeout: 150000})});
    }
  } 
});
