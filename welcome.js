module.exports = (bot) => {
  const channelId = "WELCOME CHANNEL";
  const rulesChannel = "RULES CHANNEL";
  bot.on("guildMemberAdd", (member) => {
    console.log(member);

    const message = `Welcome <@${member.id}> to our server! Be sure to check out our ${member.guild.channels.cache
      .get(rulesChannel)
      .toString()}`;

    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });
};
