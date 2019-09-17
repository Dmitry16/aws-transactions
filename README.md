High Level Design Overview:

The app is developed with NodeJS Express framework and converted to run on top of AWS Lambda using "aws-serverless-express" framework.

When a GET request hits the "get-transactions" end-point a set of currency rates from the api.exchangeratesapi.io resource is fetched. After that some random transactions (an array of objects) are generated. Finally they are sent to the 'process-transactions' end-point. When server recieves a post request it processes the data converting transactions to a different shape.

AWS end-points:

1. https://emjaznxwwe.execute-api.eu-west-1.amazonaws.com/prod/get-transactions displays randomly generated transactions.
2. https://emjaznxwwe.execute-api.eu-west-1.amazonaws.com/prod/process-transactions displays converted transactions.

To run the app locally:

1. Clone the repo.
2. Run "npm/yarn install" from the root.
3. Run "npm run start/ yarn start"

End-points:

1. GET request to the 'http://localhost:3000/get-transactions' displays randomly generated transactions.
2. GET request to the 'http://localhost:3000/process-transactions' displays converted transactions.
