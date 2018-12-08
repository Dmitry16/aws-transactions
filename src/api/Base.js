// const mandatory = require('../utils/validationHelper');

class Base {
    constructor({ apiClient }) {
        
        this.apiClient = apiClient;
    }
}

module.exports = Base;