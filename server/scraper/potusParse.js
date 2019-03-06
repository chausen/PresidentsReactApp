const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = function(url) {
    return rp(url)
        .then(function(html) {
            const $ = cheerio.load(html)            
            return {
                name: $('.firstHeading').text(),
                birthday: $('.bday').text()
            };
        })
        .catch(function(err) {
            console.error(err);
        });
};

module.exports = potusParse;