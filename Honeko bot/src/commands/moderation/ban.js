module.exports = {
    name: "ban",
    description: "Ban một thành viên nào đó khỏi server.",
    options: [
      {
        name: "target",
        description: "Chọn một đối tượng mà bạn muốn ban.",
        type: 6,
        required: true,
      },
      {
        name: "reason",
        description: "Cung cấp lý do bạn ban người đó",
        type: 3,
      },
    ],
    run: async (client, interaction) => {
      const target = interaction.options.getMember("target");
      const reason = interaction.options.getString("reason") || "Không có lý do";
  
      if (target.id === interaction.user.id) return interaction.reply({
        content: "Bạn không thể ban bản thân",
        ephemeral: true,
      });
  
      if (target.id === client.user.id) return interaction.reply({
        content: "Bạn không thể dùng lệnh của bot để ban bot đâu!",
        ephemeral: true,
      });
  
      if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
        conten: "Role của bạn không đủ cao để dùng lệnh này lên thành viên đó!",
        ephemeral: true
      });
  
      if (!target.bannable) return interaction.reply({
        content: "Xin lỗi! Bot không có đủ quyền để ban thành viên này!",
        ephemeral: true,
      });
  
      interaction.reply({ content: `✅ | Đã ban <@${target.id}> với lý do: ${reason}.` });
  
      await target.send({ content: `Bạn đã bị ban khỏi **${interaction.guild.name}**!` }).catch(() => { });
  
      target.ban({ reason: reason }).catch(() => { });
    }
  }