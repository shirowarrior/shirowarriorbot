const Discord = require('discord.js');
const bot = new Discord.Client();
// import lib for dice mechanics for dnd play

var mysql = require('mysql');
//few persite setting and secrent token 
const config = require('./config.json');
const ddiff = require('return-deep-diff');
//show that server code/server is run in comand line
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(bot);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

// the login details for sql server and select wich data base to use
var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
// show the bot have connect to the data base and it ID
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.👌 `);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});


bot.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });
      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

bot.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', config.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', config.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === config.ownerid) permlvl = 4;
  return permlvl;
};

// a function that add new member join server to the sql data base
bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  console.log("Trying to insert members " + member.user.username + " into database");
  var info = {
    "membersname": member.user.username,
    "membersid": member.user.id,
    "gold": '0',
    "class": "warroir"
  }

  connection.query("INSERT INTO members SET ?", info, function (error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("member Inserted!");
  })
});


/*
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
bot.on('debug', e => {
   console.log(chalk.bgBlue(e.replace(regToken, 'that was redacted')));
 });
*/
bot.on('warn', e => {
  console.log(chalk.yellow(e.replace(regToken, 'that was redacted')));
});

bot.on('error', e => {
  console.log(chalk.red(e.replace(regToken, 'that was redacted')));
});

bot.login(config.token);