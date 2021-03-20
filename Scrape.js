const axios = require("axios")
const cheerio = require("cheerio")
const Discord = require("discord.js");
const client = new Discord.Client();

async function fetchHTML(url) {
    const { data } = await axios.get(url)
    return cheerio.load(data)
  }



module.exports = {

    
      

scrape: async function(url){
    
    const $ = await fetchHTML(url);
  
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

    return scrapeOutput;

}
}