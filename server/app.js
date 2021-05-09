const Discord = require("discord.js");
const mongoose = require("mongoose");

const addOxy = require("./commands/addOxy");
const getCityOxy = require("./commands/getCityOxy");
const getStateOxy = require("./commands/getStateOxy");
const help = require("./commands/help");
require("dotenv").config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.data = require("./database/MongoDB.js");

const init = async () => {
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

  await client.login(process.env.BOT_TOKEN);

  const Twit = require("twit");

  const T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_KEY,
    access_token_secret: process.env.ACCESS_SECRET,
    bearer_token: process.env.BEARER_TOKEN,
    timeout_ms: 1000,
  });

  const dest = "840941009030086686";

  const stream = T.stream("statuses/filter", {
    track: "covid india",
  });

  stream.on("tweet", (tweet) => {
    console.log(tweet);
    const twitterMessage = `Read the latest tweet by ${tweet.user.name} (@${tweet.user.screen_name}) here: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    client.channels.cache.get(dest).send(twitterMessage);
    return;
  });
};

init();

client.on("ready", () => {
  console.log("Bot is ready");
});

const prefix = process.env.PREFIX;

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
    if (!args.length || args.length < 4) {
      message.reply("Enter details in this format : State City ContactNo Name");
    } else {
      message.reply(`Added oxygen can details : ${args}`);
      addOxy(message, args);
    }
  }

  if (command === "getoxycity") {
    if (!args.length) {
      message.reply("Enter details in this format : City");
    } else {
      getCityOxy(message, args);
    }
  }

  if (command === "getoxystate") {
    if (!args.length) {
      message.reply("Enter details in this format : State");
    } else {
      getStateOxy(message, args);
    }
  }
});
