const { MessageEmbed } = require("discord.js");

module.exports = async ({ message }) => {
  const embedContributions = await new MessageEmbed()
    .setAuthor(`YolkBot Version: ${VERSION}\n Contributions:`)
    .setDescription(
      `Lead Developer: JacBo__ \n Side Contributors: Ötzi, Bread, Vyngaard`
    )
    .setColor(0xa497f8)
    .setFooter(
      "Thank You To Everyone Who Has Contributed To This Project \n On Bashbunni's Server, I am Much Appreciative -Yolk"
    );
  (await message.channel.send(embedContributions)).delete({ timeout: 50_000 });
};
