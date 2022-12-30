const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  console.log(`${client.user.username} đã sẵn sàng!`);

  await client.application.commands.set(client.command.map((x) => x));

  client.user.setPresence({
    status: "dnd",
    activities: [
      {
        name: "Tutorial",
        type: ActivityType.Watching,
      },
    ],
  });
}