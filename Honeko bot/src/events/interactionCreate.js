const ms = require("ms");

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.command.get(interaction.commandName);

    if (!interaction.guild) return interaction.reply({
      content: "Bạn chỉ có thể dùng lệnh của bot ở trong server!",
      ephemeral: true,
    });

    if (!command) return interaction.reply({
      content: "Lệnh này không còn tồn tại nữa!",
      ephemeral: true,
    });

    const cooldownData = `${interaction.user.id}/${interaction.commandName}`;

    if (client.cooldown.has(cooldownData)) {
      const time = ms(client.cooldown.get(cooldownData) - Date.now());

      return interaction.reply({
        content: `⏰ | Bạn cần phải đợi ${time} nữa thì mới có thể dụng lại lệnh này!`,
        ephemeral: true,
      });
    }

    interaction.setCooldown = (time) => {
      client.cooldown.set(cooldownData, Date.now() + time);
      setTimeout(() => client.cooldown.delete(cooldownData), time);
    };

    await command.run(client, interaction);
  }
}