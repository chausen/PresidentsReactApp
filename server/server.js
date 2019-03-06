const app = require('express')(),
    bodyParser = require('body-parser'),
    cors = require('cors')
    presidentsRoute = require('./routes/presidents.route');

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use('/presidents', presidentsRoute);

app.listen(PORT, () => {
console.log('Listening on port ' + PORT);
});