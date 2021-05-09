const Discord = require("discord.js");
const { commands } = require("../constants/allCommands");

module.exports = help = async (message) => {
  const commandEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("The Good Bot is here")
    .setDescription(`Add the prefix ${process.env.PREFIX} before using them`)
    .setTimestamp();

  commands.map((command) => {
    console.log(command.name);
    return commandEmbed.addField(command.name, command.value, true);
  });

  message.channel.send(commandEmbed);
};
