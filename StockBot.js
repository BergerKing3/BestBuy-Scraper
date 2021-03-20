const Discord = require("discord.js");
const client = new Discord.client();
const yahooFinance = require('yahoo-finance');
const stock = new yahooFinance();



client.on('ready', () => {
    console.log('Signed in ');
});


client.on('message', message => {
    if(message.author.bot || !message.content.startsWith("$")){return}
    
    var command = message.content;
    var ticker = message.content;

    command = command.substr(command.indexOf(" ")).trim().toLowerCase();

    if(command.equals("$stock")){
        ticker = ticker.substr(ticker.indexOf(" " + 1)).trim().toLowerCase();
        





    }
})

client.login('ODE4NTYxODY4NjAzMTk1Mzky.YEZ3JQ.zJ26M_EAb2mPBU6WJsDBaSxra-s');