const Discord = require("discord.js");
const client = new Discord.Client();


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
});

async function doStuff(message){
    try{
    var command = message.content;
    var url = message.content;
    
    command = command.substr(command.indexOf(" ")).trim().toLowerCase();
    
    if(message.content.includes("$scrapy help")){
        message.channel.send("Simply Type \"$scrape\" and the BestBuy URL you would like to scrape.")
        message.delete();
    }


    if(message.content.includes("$scrape")){
        if(!message.content.includes("bestbuy.com")){
            message.channel.send("Please Enter a BestBuy URL Only");
            return}
        const $ = await fetchHTML(message.content.substr(cmd.length).trim());
  
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
        .setURL(message.content.substr(cmd.length))
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

        message.channel.send(scrapeOutput);
        message.delete();
    }} catch(error){
        message.channel.send("Not a valid URL");
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


client.login('ODIwNjgyNDc0NDA5MDMzNzQ4.YE4uHQ.z5BA8aRG6X4Ux7NAAz5LLr5zEmc');