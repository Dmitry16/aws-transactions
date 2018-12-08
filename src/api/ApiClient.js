class ApiClient {
    constructor (baseURL) {
      this.baseURL = baseURL;
    }
    
    get(client, query) {
  
      return this.request({ client, query });
    }

    request({ client, query }) {
      const conParams = {
        responseType: 'json',
        baseURL: this.baseURL,
      };
      const input = `${query}`;
      
      return client
        .get(input, conParams)
        .then(response => {
          return Promise.resolve(response.data)
        })
        .catch(console.error)
    }
  };
  
  module.exports = ApiClient;