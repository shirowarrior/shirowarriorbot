const Discord = require('discord.js');
const bot = new Discord.Client();
// import lib for dice mechanics for dnd play
var d20 = require('d20');
var mysql      = require('mysql');
//few persite setting and secrent token 
const config = require('./config.json');

// the login details for sql server and select wich data base to use

var connection = mysql.createConnection({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database
});

// show the bot have connect to the data base and it ID
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//show that server code/server is run in comand line

bot.on('ready', () => {
  console.log('I am ready!');
});

// a welcome message when poeple join server
// a function that add new member join server to the sql data base
bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(" Welcome " + member.user.username + " to this server. ");

   console.log("Trying to insert members " + member.user.username + " into database");
  var info = {
    "membersname": member.user.username,
    "membersid": member.user.id,
    "gold": '0',
    "class": "warroir"
  }

  connection.query("INSERT INTO members SET ?", info, function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("member Inserted!");
  })
});

//good bye message if someone left the server

bot.on("guildMemberRemove", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage("``` Goodbye " + member.user.username + " it sad to see you leave this server. ```");
});

//bot commands list
//add,say,ping,avatar,d20
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