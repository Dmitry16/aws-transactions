// const mandatory = require('../utils/validationHelper');

const Base = require('./Base');

class ExchangeRatesAPI extends Base {

    
    getRates(client, query) {
        
        return this.apiClient.get(client, query);
    }
}

module.exports = ExchangeRatesAPI;