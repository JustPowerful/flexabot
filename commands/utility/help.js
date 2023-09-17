const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lists all the commands you can use."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Available commands for flexa")
      .setDescription("A list of all flexa's commands")
      .setColor(0x1e90ff)
      .setThumbnail(interaction.client.user.displayAvatarURL());

    interaction.client.commands.map((command) => {
      const name = command.data.name;
      const description = command.data.description;
      embed.addFields({ name: `\`${name}\``, value: description });
    });
    await interaction.reply({ embeds: [embed] });
  },
};
