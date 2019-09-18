const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
var createError = require('http-errors');
let { HttpError } = require('error');
const Transaction = require('./transaction');
const { setRandomCurrency, setRandomAmount } = require('./utils')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// no caching set up
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store');
    next();
});
// when GET request hits the "get-transactions" end-point the carrenies rates
// from api.exchangeratesapi.io are fetched then random transactions are generated
// and are posted to the 'process-transactions' end-point
app.get('/get-transactions', async (req, res) => {
    const query = 'base=EUR';
    const { baseUrl } = require('./config');
    let data = await getCurrenciesRates(request, baseUrl, query);
    let randomTransactions = generateRandomTransactions(baseUrl, query, data);
    postProcessTransactions(randomTransactions);
    res.send(randomTransactions);
});

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(require('middleware/sendHttpError'));
// error handler
app.use(function(err, req, res, next) {
  if (typeof err === 'number') {
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  }
});

let convertedTransactions = [];
// here we extract the data (transactions) from the post request and 
// convert them. if everything is OK we send the confirmation
app.post('/process-transactions', (req, res) => {
    let bodyStr = '';
    req.on('data',function(chunk) {
        bodyStr += chunk.toString();
    });
    req.on('end',function() {
        convertedTransactions = convertTransactions(JSON.parse(bodyStr));
        const response = {
            "success": true,
            "passed": 1,
            "failed": 0
        };
        if (convertedTransactions) {
            res.send(response);
        } else {
            res.status(501).send('Some error occured, please try again.');
        }
    });
});

// sending the converted transactions
app.get('/process-transactions', (req, res) => {
    res.send(convertedTransactions);
});

function postProcessTransactions(transactions) {
    if (process.env.AWS_EXECUTION_ENV) {
        uri = 'https://emjaznxwwe.execute-api.eu-west-1.amazonaws.com/prod/process-transactions';
    }
    if (process.env.NODE) {
        uri = 'http://localhost:3000/process-transactions'
    }
    
    request({
        method: 'POST',
        uri: uri,
        body: JSON.stringify(transactions),
    }, (err, response, body) => {
        if (err) console.error(err);
    });
};

function getCurrenciesRates(client, baseUrl, query) {

    return new Promise((resolve, reject) => {
        client(baseUrl + query, (err, response, body) => {
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

function generateRandomTransactions(baseUrl, query, data) {

    let transactions = [];
    
    for (let i = 0; i < 5; i++) {
        const currency = setRandomCurrency(Object.entries(data));
        const amount = setRandomAmount(100, 1000);
        const transaction = new Transaction(currency, amount, baseUrl, query, i);
        transactions.push(transaction.init());
    }
    return transactions;
};

module.exports = app;