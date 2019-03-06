const presidentsRoute = require('express').Router(),
    getPresidents = require('../scraper/potusScraper');      

presidentsRoute.route('/get').get(function (req, res) {  
    getPresidents()
        .then(presidents => res.status(200).json(presidents))
        .catch(err => res.status(400).send("Failed to retrieve presidents: " + err));
});

module.exports = presidentsRoute;