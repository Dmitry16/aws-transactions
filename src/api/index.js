const { baseUrl } = require('../config');
const ApiClient = require('./ApiClient');
// const mandatory = require('../utils/validationHelper');

const ExchangeRatesAPI  = require('./customAPI');

function apiFactory( baseURL ){
    const api = new ApiClient( baseURL );

    return {
        fetchExchangeRatesApi: new ExchangeRatesAPI({ apiClient: api }),
    };
}

module.exports = apiFactory( baseUrl );