const { postOxygen } = require("../database/MongoDB");

module.exports = addOxy = async (message, args) => {
  message.channel.send("Thanks for your contribution. Have a good day ");
  // add to db
  postOxygen(args[0], args[1], args[2], args[3]);
};
