const Discord = require('discord.js');

module.exports = (guild, user) => {

  guild.defaultChannel.send(`${user.tag} was just unbanned!`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.bot.unbanAuth.tag}\n**Reason:** ${guild.bot.unbanReason}`);
  return guild.channels.get(guild.channels.find('name', 'mod-log').id).send({embed});

};
