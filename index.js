const Discord = require('discord.js');
const bot = new Discord.Client();
var d20 = require('d20');


const config = require('./config.json');

bot.on('ready', () => {
  console.log('I am ready!');
});


bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage("``` Welcome " + member.user.username + " to this server. ```");
});

bot.on("guildMemberRemove", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage("``` Goodbye " + member.user.username + " it sad to see you leave this server. ```");
});

bot.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix))return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    console.log(command);

    let args = message.content.split(" ").slice(1);

    if (command === "add"){
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce((p, c) => p+c);

      message.channel.sendMessage(total);
    }

    if (command === "say") {
      message.channel.sendMessage(args.join(" "));
    }

    //if (message.content.startsWith(prefix + "ping")) {
      if (command === "ping"){
    message.channel.sendMessage('``` master I am here to serve you ```');
      }

if (command === "avatar") {
    // send the user's avatar URL
    message.reply(message.author.avatarURL);
  }


     // d&d commands
     if (command === "d20"){
       let dice = d20.roll(20);
       message.channel.sendMessage("you have roll a " + dice);
     }

});




bot.login(config.token);