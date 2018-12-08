const express = require('express');
// const httpClient = require('./api');
const request = require('request');
const Transaction = require('./transaction');
const { baseUrl } = require('./config');
const { setRandomCurrency, setRandomAmount } = require('./utils')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', async (req, res) => {

    const query = 'base=EUR';
    const { baseUrl } = require('./config');

    let data = await getCurrenciesRates(baseUrl, query);

    // data = generateRandomTransactions(baseUrl, query, data);

    // let convertedTransactions = convertTransactions(data);

    // await postProcessTransactions(convertedTransactions);

    res.send(data);
})

async function getCurrenciesRates(baseUrl, query) {

    return new Promise((resolve, reject) => {
        request(baseUrl + query, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(JSON.parse(body).rates);
            } else {
                reject(err)
            }            
        });
    });
};

function convertTransactions(data) {

    return data.reduce((acc, key, ind) => {
        acc.push({
            "createdAt": key.createdAt,
            "currency": "EUR",
            "convertedAmount": key.convertedAmount,
            "checksum": key.checksum
        });
        return acc;
    },[]);
}


module.exports = app;