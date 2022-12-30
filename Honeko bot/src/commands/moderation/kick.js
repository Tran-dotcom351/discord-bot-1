module.exports = {
    name: "kick",
    description: "Kick một thành viên nào đó khỏi server.",
    default_member_permissions: 2,
    options: [
      {
        name: "target",
        description: "Chọn một đối tượng mà bạn muốn kick.",
        type: 6,
        required: true,
      },
      {
        name: "reason",
        description: "Lý do bạn kick người đó",
        type: 3,
      },
    ],
    run: async (client, interaction) => {
      const target = interaction.options.getMember("target");
      const reason = interaction.options.getString("reason") || "không có lý do";
  
      if (target.id === interaction.user.id)
        return interaction.reply({
          content: "Bạn không thể kick bản thân đâu!",
          ephemeral: true,
        });
  
      if (target.id === client.user.id)
        return interaction.reply({
          content: "Bạn không thể dùng lệnh của tui để kick tui đâu!",
          ephemeral: true,
        });
  
      if (
        target.roles.highest.position >= interaction.member.roles.highest.position
      )
        return interaction.reply({
          content: "Role của bạn phải cao hơn họ mới có thể dùng được lệnh kick!",
          ephemeral: true,
        });
  
      if (!target.kickable)
        return interaction.reply({
          content: "Xin lỗi! Tui không thể kick thành viên này!",
          ephemeral: true,
        });
  
      interaction.reply({
        content: `✅ | Đã kick <@${target.id}> với lý do: ${reason}`,
      });
  
      await target
        .send({
          content: `Bạn đã bị kick khỏi **${interaction.guild.name}**`,
        })
        .catch(() => {});
  
      target.kick(reason).catch(() => {});
    },
  };