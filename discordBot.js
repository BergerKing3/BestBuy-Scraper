const Discord = require('discord.js');
const client = new Discord.Client();

var probabilty = 5;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(message.author.bot){return}
    if(message.content.startsWith("#")){
        var msg = message.content;
        probabilty = parseInt(msg.substr(1, msg.length));
    } else {
        if(parseInt(Math.random() * (100 / probabilty)) == 1 || parseInt(Math.random() * (100 / probabilty)) == 0){
            emb = new Discord.MessageEmbed()
            .setImage()
            .setTitle("yum");
            
            message.channel.send(emb);
        }
    }



});

client.login('ODE4NTYxODY4NjAzMTk1Mzky.YEZ3JQ.zJ26M_EAb2mPBU6WJsDBaSxra-s')