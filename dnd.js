
var d20 = require('d20');

orc = {
health = 30,
armor = 5,
attack = 3

};

warrior = {
    health = 50,
    armor = 2,
    attack = 2
}

function attackBoss(){
let bossroll = d20.roll(20);
let playerroll = d20.roll(20);
 if(bossroll >= playerroll){
        console.log('BossRoll was bigger or equal to playerRoll');
    }else {
        console.log('PlayerRoll was bigger');
    }

};

function attackplayer(){
let bossroll = d20.roll(20);
let playerroll = d20.roll(20);
 if(playerroll >= bossroll){
        console.log('playerrol was bigger or equal to bossroll');
    }else {
        console.log('bossroll was bigger');
    }

};

