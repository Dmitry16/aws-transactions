module.exports = {

    setRandomCurrency: function(currencies) {

        const randomNum = Math.floor(Math.random() * currencies.length);
        
        return currencies[randomNum];
    },

    setRandomAmount: function(min, max) {

        const randomAmount = Math.floor(Math.random() * (max - min) + min);

        return randomAmount;
    }
}