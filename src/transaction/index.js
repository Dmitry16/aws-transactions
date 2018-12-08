const crypto = require('crypto');

class Transaction {
    constructor(currency, amount, baseUrl, query, key) {
        this.date = new Date().toISOString();
        this.baseUrl = baseUrl;
        this.query = query;
        this.currency = currency[0];
        this.currencyRate = currency[1];
        this.amount = amount;
        this.key = key;
    }
    convertAmount() {
        return (this.amount/this.currencyRate).toFixed(4);
    }

    generateCheckSum() {
        const str = this.baseUrl + this.currency + this.amount + this.key + new Date();
        return crypto.createHash('sha256').update(str).digest('hex');
    }

    init() {
        return {
            "createdAt": this.date,
            "currency": this.currency,
            "amount": this.amount,
            "convertedAmount": this.convertAmount(),
            "exchangeUrl": this.baseUrl + this.query,
            "checksum": this.generateCheckSum()
        };
    }
}

module.exports = Transaction;