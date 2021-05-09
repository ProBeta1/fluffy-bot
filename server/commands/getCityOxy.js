const Discord = require("discord.js");
const { getCityOxygen } = require("../database/MongoDB");
const Moment = require("moment");

module.exports = getCityOxy = async (message, args) => {
  let res = await getCityOxygen(args[0]);

  const commandEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`Oxygen cans in city ${args[0]}`);

  res.map((item) => {
    return commandEmbed.addFields(
      {
        name: "Name",
        value: item.name,
        inline: true,
      },
      {
        name: "Contact Number",
        value: item.contact,
        inline: true,
      },
      {
        name: "Added on",
        value: Moment(item.addedAt).format("MMMM Do YYYY, h:mm:ss a"),
        inline: false,
      }
    );
  });

  message.channel.send(commandEmbed);
};
