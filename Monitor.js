const Discord = require("discord.js");
const client = new Discord.Client();

var Scrape = require('./Scrape');
const axios = require("axios")
const cheerio = require("cheerio")



client.on('ready', () => {
    console.log('Signed in ');
    client.user.setActivity("BestBuy", { type: "Watching"})
});

async function doStuff(message){
    var command = message.content;
    var url = message.content;
    
    command = command.substr(command.indexOf(" ")).trim().toLowerCase();
    var cmd = "$scrape ";
    if(message.content.includes("$scrapy help")){
        message.channel.send("Simply Type \"$scrape\" and the BestBuy URL you would like to scrape.")
        message.delete();
    }


    if(message.content.includes("$scrape")){
        
  

        const botGuilds = client.guilds

        client.guilds.cache.forEach((guild)  => {
            console.log(guild.name)
            
            try{
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(Scrape.scrape(message.content.substr(cmd.length).trim()));
            } catch(error){
                message.guild.channels.create('scrapy-monitor', { //Create a channel
                    type: 'text', //Make sure the channel is a text channel
                    permissionOverwrites: [{ //Set permission overwrites
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
                });
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(Scrape.scrape(message.content.substr(cmd.length).trim()));
            }
        });

        
        message.delete();
        
    }
}


client.on('message', message => {
    if(message.author.bot || !message.content.startsWith("$")){return}
    doStuff(message);
    
});






client.login('ODIwNjgyNDc0NDA5MDMzNzQ4.YE4uHQ.z5BA8aRG6X4Ux7NAAz5LLr5zEmc');