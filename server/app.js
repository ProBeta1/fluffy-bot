const Discord = require("discord.js");
const mongoose = require("mongoose");

const addOxy = require("./commands/addOxy");
const help = require("./commands/help");
require("dotenv").config();

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("Bot is ready");
});

const prefix = process.env.PREFIX;

const uri = process.env.DB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  console.log(command);

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! My latency : ${timeTaken}ms.`);
  }

  if (command === "help") {
    help(message);
  }

  if (command === "addoxy") {
    if (!args.length) {
      message.reply("Enter details in this format : State City ContactNo");
    } else {
      message.reply(`Added oxygen can detail : ${args}`);
      addOxy(message);
    }
  }
});
