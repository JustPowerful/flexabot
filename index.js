require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! logged in as ${c.user.tag}!`);
});

client.login(token);
