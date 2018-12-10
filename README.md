The app is developed making use of Node.js Express framework and converted to run on top of AWS lambda as a service using "aws-serverless-express" framework.

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