/* eslint-disable no-underscore-dangle */
const Discord = require('discord.js');
String.prototype.capitalize = function() { // eslint-disable-line
  return this.charAt(0).toUpperCase() + this.slice(1);
};

exports.run = async (bot, msg, [player]) => {
  const OW = require("overwatch-stats");
  const moment = require("moment");
  require("moment-duration-format");

  const embed = new Discord.RichEmbed();
  const data = await OW.load(player);
  const stats = new OW(data);
 const gameMode = stats._data.eu.stats.competitive;
 /*
 const gameMode = {}
  if(!stats || stats === null){
 gameMode = stats._data.eu.stats.competitive;
}else{
 gameMode = stats._data.us.stats.competitive;
}
*/
  let rank = gameMode.overall_stats.tier;
  let sr = gameMode.overall_stats.comprank;

  if (rank === null && sr === null) {
    rank = "n/A";
    sr = "N/A";
  }

  try {
    embed
    .setColor(0xF39C1B)
    .setFooter("Overwatch Stats", gameMode.overall_stats.avatar)
    .setTimestamp()
    .setThumbnail(gameMode.overall_stats.avatar)
    .addField("> Battletag", stats._battleTag, true)
    .addField("> Level", (gameMode.overall_stats.prestige * 100) + gameMode.overall_stats.level, true)
    .addField("> Rank", rank.capitalize(), true)
    .addField("> Season Rating", sr, true)
    .addField("> Average Eliminations", gameMode.average_stats.eliminations_avg, true)
    .addField("> Average Damage", gameMode.average_stats.damage_done_avg, true)
    .addField("> Average Deaths", gameMode.average_stats.deaths_avg, true)
    .addField("> Average Final Blows", gameMode.average_stats.final_blows_avg, true)
    .addField("> Average Healing", gameMode.average_stats.healing_done_avg, true)
    .addField("> Average Objective Kills", gameMode.average_stats.objective_kills_avg, true)
    .addField("> Average Objective Time", moment.duration(gameMode.average_stats.objective_time_avg, "hours").format("m:ss"), true)
    .addField("> Average Solo Kills", gameMode.average_stats.solo_kills_avg, true);
    return msg.channel.send("", { embed });
  } catch (err) {
    msg.channel.send(":x: I could not find a player with that battle-tag, please try again.");
    console.error(err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases:[],
  permLevel: 0
};

exports.help = {
  name: "eow",
  description: "Displays eu overwatch player stats",
  usage: "<player:str>",
  
};
