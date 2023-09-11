const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const resourcesPath = path.join(__dirname, "resources");
const resourceFiles = fs
  .readdirSync(resourcesPath)
  .filter((file) => file.endsWith(".json"));
const categories = resourceFiles.map((file) => file.replace(".json", ""));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resources")
    .setDescription(
      "Replies with basic resources for you to start learning your topic."
    )
    .addStringOption((option) => {
      // set options here
      return option
        .setName("category")
        .setDescription("The resource category you want to learn about.")
        .setRequired(true);
    }),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    const exists = categories.includes(category);
    if (!exists) {
      return await interaction.reply(
        `This category doesn't exist, please type \`/help\` for more.`
      );
    }
    const filePath = path.join(resourcesPath, `${category}.json`);
    const data = require(filePath);
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(data.title)
      .setDescription(data.description);

    data.resources.forEach((category) => {
      const categoryName = category.title;
      const categoryContent = category.content;

      // Add a field for each category
      embed.addFields({
        name: categoryName,
        value: categoryContent
          .map((item) => `[${item.title}](${item.href})`)
          .join("\n"),
      });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
