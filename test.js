const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.bestbuy.com/site/samsung-galaxy-buds-pro-true-wireless-earbud-headphones-phantom-black/6443995.p?skuId=6443995';

var html;

axios.get(url)
    .then(response => {
        //html = response.data;
        //console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })




// "heading - 5 v-fw-regular"

var $ = cheerio.load('https://www.bestbuy.com/site/samsung-galaxy-buds-pro-true-wireless-earbud-headphones-phantom-black/6443995.p?skuId=6443995');
console.log($.parseHTML('<h1 class="heading-5 v-fw-regular"></h1>'));


/*
let getData = html => {
    data[];

    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-chil(3)')


} */