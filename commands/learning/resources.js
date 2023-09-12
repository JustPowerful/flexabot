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
      `Replies with learning resources, type /resources all to see all categories`
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
      if (category === "all") {
        // reply with the possible list of all categories
        const embed = new EmbedBuilder()
          .setTitle("All possible resource categories")
          .setDescription(
            "These are all the resource categories you can browse"
          )
          .setThumbnail(interaction.client.user.displayAvatarURL());

        categories.forEach((category) => {
          let filePath = path.join(resourcesPath, `${category}.json`);
          let file = require(filePath);
          embed.addFields({ name: `\`${category}\``, value: file.description });
        });
        return interaction.reply({ embeds: [embed] });
      }
      return await interaction.reply(
        `This category doesn't exist, please type \`/resources all\` for more.`
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
