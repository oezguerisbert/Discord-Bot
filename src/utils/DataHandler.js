const dotenv = require("dotenv");
const axios = require("axios");
const { BOT_VERSION } = require("../utils/Constants");
dotenv.config();
const PORT = process.env.PORT;

module.exports = {
  get: async ({ message, userid }) => {
    const responseData = await axios.get(`http://localhost:${PORT}/accounts`, {
      params: { UserID: userid },
    });
    if (responseData) {
      if (responseData.data === []) {
        console.log(responseData.data);
      }
      const parsed = responseData.data
        .map((row) => `Date: ${row.CalenderDate}, Time: ${row.CalenderTime}`)
        .join("\n\n");
      const userDataEmbed = new MessageEmbed()
        .setAuthor(`YolkBot Version: ${BOT_VERSION}`)
        .setDescription(`${parsed}`);
      message.channel.send(userDataEmbed);
    }
  },
  post: async ({ message, userid, date, time }) => {
    const responseData = await axios.post("https://yolkbot.herokuapp.com/", {
      CalenderDate: date,
      CalenderTime: time,
      UserID: userid,
    });
    if (responseData) {
      const embedDataUser = new MessageEmbed()
        .setAuthor(`YolkBot Version: ${BOT_VERSION}`)
        .setDescription(`***Your Data is Now*** ___Updated___`);
      message.channel.send(embedDataUser).then((m) => {
        m.delete({ timeout: 60000 });
      });
    }
  },
  delete: async (userid) => {
    const responseData = await axios.delete(
      "https://yolkbot.herokuapp.com/accounts",
      {
        data: { UserID: userid },
      }
    );
    if (responseData) {
      const sentMessage = new MessageEmbed()
        .setAuthor(`YolkBot ${BOT_VERSION}`)
        .setTitle("Successfully Deleted All Scheduling Data")
        .setColor(0xa497f8)
        .setDescription(
          `If You Would Like To Add Another Schedule, Please Use The \n !schedule {create, delete} {day of week: "M", "T" "W" "TH" "F" "S" "SU"}\n Command `
        );
      (await message.channel.send(sentMessage)).delete({ timeout: 60_000 });
    }
  },
};
