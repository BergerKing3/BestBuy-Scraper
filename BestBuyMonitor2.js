const Discord = require("discord.js");
const client = new Discord.Client();

var urls = ['https://www.bestbuy.com/site/evga-geforce-rtx-3070-xc3-ultra-gaming-8gb-gddr6-pci-express-4-0-graphics-card/6439299.p?skuId=6439299', 'https://www.bestbuy.com/site/msi-nvidia-geforce-rtx-3070-ventus-3x-oc-bv-8gb-gddr6-pci-express-4-0-graphics-card/6438278.p?skuId=6438278', 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440', 'https://www.bestbuy.com/site/asus-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432445.p?skuId=6432445', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3080-gaming-oc-10gb-gddr6x-pci-express-4-0-graphics-card/6430620.p?skuId=6430620', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3080-aorus-master-10gb-gddr6x-pci-express-4-0-graphics-card/6436223.p?skuId=6436223', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3080-vision-oc-10gb-gddr6x-pci-express-4-0-graphics-card/6436219.p?skuId=6436219', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-ftw3-ultra-gaming-10gb-gddr6-pci-express-4-0-graphics-card/6436196.p?skuId=6436196', 'https://www.bestbuy.com/site/pny-geforce-rtx-3080-10gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432655.p?skuId=6432655', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3080-eagle-oc-10gb-gddr6x-pci-express-4-0-graphics-card/6430621.p?skuId=6430621', 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442', 'https://www.bestbuy.com/site/asus-nvidia-geforce-rog-strix-rtx3070-8gb-gddr6-pci-express-4-0-graphics-card-black/6439127.p?skuId=6439127', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3070-gaming-oc-8gb-gddr6-pci-express-4-0-graphics-card/6437909.p?skuId=6437909'
, 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3070-gaming-oc-8gb-gddr6-pci-express-4-0-graphics-card/6437909.p?skuId=6437909', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3070-vision-oc-8gb-gddr6-pci-express-4-0-graphics-card/6439385.p?skuId=6439385', 'https://www.bestbuy.com/site/gigabyte-nvidia-geforce-rtx-3070-aorus-master-8gb-gddr6-pci-express-4-0-graphics-card/6439384.p?skuId=6439384'
];    
const axios = require("axios")
const cheerio = require("cheerio")
var cmd = "$scrape ";
async function fetchHTML(url) {
    try{
  const { data } = await axios.get(url)
  return cheerio.load(data)}
  catch{
      console.log("AH!");
  }
}


client.on('ready', () => {
    console.log('Signed in ');
    client.user.setActivity("BestBuy", { type: "Watching"})

    const botGuilds = client.guilds

        client.guilds.cache.forEach((guild)  => {
            console.log(guild.name)
            
            try{
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(`Scanning ${urls.length} BestBuy URLs for Restocks`);
            } catch(error){
                message.guild.channels.create('scrapy-monitor', { //Create a channel
                    type: 'text', //Make sure the channel is a text channel
                    permissionOverwrites: [{ //Set permission overwrites
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
                });
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(`Scanning ${urls.length} BestBuy URLs for Restocks`);
            }
        });
});

async function doStuff(message){
    try{
    var command = message.content;
    var url = message.content;
    
    command = message.content;
    
    
    
        
        const $ = await fetchHTML(message.trim());
  
    // Print the full HTML;
    // console.log(`Site HTML: ${$.html()}\n\n`);
    // Print some specific page content
    var tmp = $('div[class="priceView-hero-price priceView-customer-price"]').html()
    var price = tmp.substr(tmp.indexOf("$"), tmp.indexOf(".") - 22);

    var sku = $('span[class="product-data-value body-copy"]').text()
    var txt = sku.substr(sku.indexOf(' '), sku.length).trim();

    var inStock;

    if($('button[class="btn btn-disabled btn-lg btn-block add-to-cart-button"]').html() == null){
        inStock = 'Stock: In Stock';
    } else {
        inStock = (`Stock: ${$('button[class="btn btn-disabled btn-lg btn-block add-to-cart-button"]').html()}`);
    }
   
    var imgURL = `https://pisces.bbystatic.com/image2/BestBuy_US/images/products/${encodeURIComponent(txt.substr(0, 4))}/${encodeURIComponent(txt)}_sd.jpg`;
    var scrapeOutput = new Discord.MessageEmbed()
        .setTitle(`${$('h1[class="heading-5 v-fw-regular"]').html()}`)
        .setURL(url)
        .setImage(imgURL)
        .setAuthor("BestBuy", "https://i.imgur.com/CzpBBUf.png")
        .setTimestamp()
        .setColor("#19FF2B")
        .addFields(
            {name: 'Stock', value: inStock, inline: true },
            {name: 'Price', value: price, inline: true},
            {name: 'Reviews', value: `${$('span[class="ugc-c-review-average"]').html()} ${$('span[class="c-reviews-v4 "]').html()}`, inline: true},
            {name: 'Model Number', value: $('span[class="product-data-value body-copy"]').html(), inline: true},
            {name: 'SKU', value: txt, inline: true}
        );


        const botGuilds = client.guilds

        client.guilds.cache.forEach((guild)  => {
            console.log(guild.name)
            
            try{
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(scrapeOutput);
            } catch(error){
                message.guild.channels.create('scrapy-monitor', { //Create a channel
                    type: 'text', //Make sure the channel is a text channel
                    permissionOverwrites: [{ //Set permission overwrites
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
                });
                guild.channels.cache.find(channel => channel.name === "scrapy-monitor").send(scrapeOutput);
            }
        });
        
    } catch(error){
        console.log(error);
    }
    }



client.on('message', message => {
    if(message.author.bot || !message.content.startsWith("$")){return}
    
    try{
        doStuff(message);
    } catch(error){
        message.channel.send("URL Not Found");
    }
    
});

async function main(){
while(true){
    

    for(i = 0; i < urls.length; i++){
        const $ = await fetchHTML(urls[i]);
        if($('button[class="btn btn-disabled btn-lg btn-block add-to-cart-button"]').html() == null){
        doStuff(urls[i])
    }
    }

    setTimeout(() => console.log("hi"), 60000)
}
}



client.login('ODIwNjgyNDc0NDA5MDMzNzQ4.YE4uHQ.gTLIbJI6Kp-4NRmHbql7e2TzmWk');

main();