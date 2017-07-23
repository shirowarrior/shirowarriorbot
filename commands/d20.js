var d20 = require('d20');
exports.run = (bot, message) => {
  let dice = d20.roll(20);
    message.channel.send("you have roll a " + dice);
 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'd20',
  description: 'if you want to roll a 20 side dices',
  usage: 'dnd'
};
