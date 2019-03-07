const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = async function(url) {
    try {
        const html = await rp(url);
        const $ = cheerio.load(html);
        return {
            name: $('.firstHeading').text(),
            birthday: new Date($('.bday').text())
        };
    }
    catch (err) {
        console.error(err);
    }
};

module.exports = potusParse;