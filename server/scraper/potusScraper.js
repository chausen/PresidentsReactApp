const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');

const rootWikiUrl = 'https://en.wikipedia.org/';
const presidentsUrl = rootWikiUrl + 'wiki/List_of_Presidents_of_the_United_States';

let cachedPresidents = [];

const getPresidents = async function() {
    if (cachedPresidents != []) {
        console.log('Using cache...');
        return cachedPresidents;
    }

    try {
        const html = await rp(presidentsUrl);
        const wikiUrls = [];
        for (let i = 0; i < 45; i++) {
            wikiUrls.push($('big > a', html)[i].attribs.href);
        }
        const presidents = await Promise.all(wikiUrls.map((url) => potusParse(rootWikiUrl + url)));
        
        console.log(presidents)
        cachedPresidents = presidents;

        return presidents;
    }
    catch (err) {
        return console.error(err);
    }
}

module.exports = getPresidents;