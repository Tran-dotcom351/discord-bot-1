module.exports = {
    name: "unban",
    description: "Gỡ lệnh ban cho một thành viên nào đó.",
    default_member_permissions: 4,
    options: [
      {
        name: "memberid",
        description: "Id thành viên mà bạn muốn gỡ.",
        type: 3,
        required: true,
      },
    ],
    run: async (client, interaction) => {
      const memberId = interaction.options.getString("memberid");
  
      interaction.guild.bans.remove(memberId).then((user) => {
        interaction.reply({ content: `Đã gỡ lệnh ban thành công cho ${user.username}!` });
      }).catch(() => {
        interaction.reply({ content: `Không thể gỡ lệnh cấm cho thành viên có id: ${memberId}!`, ephemeral: true });
      });
    }
  }