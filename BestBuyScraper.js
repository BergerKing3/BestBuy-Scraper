const axios = require("axios")
const cheerio = require("cheerio")

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}


async function Scrape(url){
    const $ = await fetchHTML(url);

    var output = [];
    output.length = 7;
    // Print the full HTML;
    // console.log(`Site HTML: ${$.html()}\n\n`);
    // Print some specific page content
    console.log(`Title: ${$('h1[class="heading-5 v-fw-regular"]').html()}`);
    if($('button[class="btn btn-disabled btn-lg btn-block add-to-cart-button"]').html() == null){
        console.log('Stock: In Stock');
    } else {
        console.log(`Stock: ${$('button[class="btn btn-disabled btn-lg btn-block add-to-cart-button"]').html()}`);
    }
    var tmp = $('div[class="priceView-hero-price priceView-customer-price"]').html()
    var price = tmp.substr(tmp.indexOf("$"), tmp.indexOf(".") - 22);

    console.log(`Price: ${price}`);

    console.log(`Reviews: ${$('span[class="ugc-c-review-average"]').html()} ${$('span[class="c-reviews-v4 "]').html()}`);

    console.log(`Model Number: ${$('span[class="product-data-value body-copy"]').html()}`);

    var sku = $('span[class="product-data-value body-copy"]').text()
    var txt = sku.substr(sku.indexOf(' '), sku.length).trim();

    console.log(`SKU: ${txt}`);

    console.log($('img[class="primary-image"]').html());


    console.log(`https://pisces.bbystatic.com/image2/BestBuy_US/images/products/${encodeURIComponent(txt.substr(0, 4))}/${encodeURIComponent(txt)}_sd.jpg`)


    return output;
}
Scrape('https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p?skuId=6439402');
