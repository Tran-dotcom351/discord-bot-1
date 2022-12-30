module.exports = {
    name: "ping",
    description: "Xem tốc độ phản hồi của bot.",
    run: async (client, interaction) => {
      interaction.reply({ content: `Pong! ${client.ws.ping}ms!` });
  
      interaction.setCooldown(5000); // 5 giây
    }
  }