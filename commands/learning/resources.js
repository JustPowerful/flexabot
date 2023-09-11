const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resources")
    .setDescription(
      "Replies with basic resources for you to start learning your topic."
    ),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
