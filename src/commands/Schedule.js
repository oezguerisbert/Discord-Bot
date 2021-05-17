const { MessageEmbed } = require("discord.js");
const DataHandler = require("../utils/DataHandler");

const DOTW = ["M", "T", "W", "TH", "F", "SA", "SU"];

module.exports = async ({ userid, client, message, additional }) => {
  const [commandOption, ...options] = additional;
  if (commandOption) {
    switch (commandOption) {
      case "create":
        if (options.length == 2) {
          // date + time
          let [date, time] = options;
          if (!DOTW.includes(date)) {
            let errEmbed = new MessageEmbed()
              .setAuthor(
                `YolkBot Version: ${VERSION} \n SYNTAX_ERR: DATE EXPECTED, GOT ${date}`
              )
              .setDescription(
                `You Must Specify a Valid Date To Schedule \n Valid Dates: ${DOTW.map(
                  (d) => `"${d}"`
                ).join(",")}`
              );
            message.channel.send(errEmbed).then((m) => {
              m.delete({ timeout: 30_000 });
            });
            return;
          }
          const [hours, minutes] = /([0-9]{1,2})\:([0-9]{1,2})(?:P|A)?M/g
            .exec(time)
            .map((t) => parseInt(t));
          if (
            !isNaN(hours) &&
            !isNaN(minutes) &&
            hours <= 12 &&
            hours >= 0 &&
            minutes >= 0 &&
            minutes <= 59
          ) {
            let errEmbed = new MessageEmbed()
              .setAuthor(
                `YolkBot Version: ${VERSION} \n SYNTAX_ERR: TIME EXPECTED, GOT ${time}`
              )
              .setDescription(`You Must Specify a Valid Time To Schedule`);
            message.channel.send(errEmbed).then((m) => {
              m.delete({ timeout: 30_000 });
            });
            return;
          }
          await DataHandler.post({
            userid,
            date,
            time,
            message,
          });
        } else {
          let errEmbed = new MessageEmbed()
            .setAuthor(
              `YolkBot Version: ${VERSION} \n SYNTAX_ERR: DATE AND TIME EXPECTED.`
            )
            .setDescription(`You Must Specify a Valid Date & Time To Schedule`);
          message.channel.send(errEmbed).then((m) => {
            m.delete({ timeout: 30_000 });
          });
          return;
        }
        break;
      case "delete":
        await DataHandler.delete(message.author.id);
        break;
      default:
        // get user-schedule of mentioned user or user from original message.
        // example-1:   @testuser: !schedule
        // result:      userid => <id of @testuser>

        // example-2:   @testuser: !schedule @justatester
        // result:      userid => <id of @justatester>
        if (commandOption.startsWith("<@") && mention.endsWith(">")) {
          commandOption = commandOption.slice(2, -1);

          if (commandOption.startsWith("!")) {
            commandOption = commandOption.slice(1);
          }

          userid = client.users.cache.get(commandOption)?.id ?? userid;
        }

        await DataHandler.get({ message, userid });
        break;
    }
  }
};
