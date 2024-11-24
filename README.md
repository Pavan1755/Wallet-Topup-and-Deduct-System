# Wallet Topup and Deduct System
*The Wallet System project is a simple web application designed for managing wallet transactions. Users can top-up, deduct, and view their wallet balances. It comprises a backend API built with Node.js and Express, and a frontend UI built with React.*


# Features
###### Top-Up Wallet: Add money to the user's wallet.
###### Deduct Wallet: Deduct money from the user's wallet.
###### View Balance: View the current balance of a user by providing their user ID.
###### Error Indicators: Display error messages for invalid inputs or failed transactions.
###### Loading Indicators: Show animations while processing requests.


# Technologies Used
## wallet-frontend[Frontend]
###### React: Frontend library for building user interfaces.
###### Redux: State management for handling wallet data.
###### Axios: HTTP client for making API requests.
###### Tailwind CSS: Utility-first CSS framework for styling.

## wallet-system[Backend]
###### Node.js: Server-side runtime.
###### Express: Web framework for API development.
###### Sequelize: ORM for database interactions.
###### Postgresql: A scalable, open-source database system suitable for both lightweight local storage and large-scale applications.
###### CORS: Middleware for handling cross-origin requests.


# Setup Instructions
## wallet-frontend[Frontend] Setup
### Navigate to the frontend folder:
> cd .\wallet-frontend\

### Install dependencies:
> npm install

### Start the development server:
###### npm run start -p 3001
###### The wallet-frontend will run on "http://localhost:3001".

## wallet-system[Backend] Setup
### Navigate to the backend folder:-
> cd .\wallet-system\

### Install dependencies:-
> npm install

### Set up environment variables:-
##### Create a .env file in the wallet-system directory and add:
> PORT=3000

### Run the wallet-system server:
###### npx ts-node .\src\server.ts
###### The wallet-system will run on "http://localhost:3000".


# API Endpoints
## Base URL:
> http://localhost:3000

## 1. Top-Up Wallet
### Request Body:
{
  "user_id": "string",
  "amount": "number"
}

### Response:
{
  "status": true,
  "new_balance": "number"
}

## 2. Deduct Wallet
### Request Body:
{
  "user_id": "string",
  "amount": "number"
}

### Response:
{
  "status": true,
  "new_balance": "number"
}

## 3. View Balance
> Query Parameter: user_id

### Response:
{
  "balance": "number"
}


# wallet-frontend Features
## User-Friendly Interface:
###### Clear, minimalist design using Tailwind CSS.
###### Simple input forms for user ID and transaction amounts.

## Transaction Options:
> Radio buttons to select between Top-Up and Deduct.

## Real-Time Feedback:
###### Loading animations while API requests are being processed.
###### Error messages displayed when requests fail or inputs are invalid.
###### Current balance shown dynamically after fetching.

## View Balance:
> Separate field to view balance by user ID.


# Error Handling
## wallet-frontend:
### Displays a "User not found" message for:
###### Enter Invalid user ID.
###### API request errors (e.g., server not reachable).
###### Errors are shown in a red-colored alert box for clear visibility.

## wallet-system:
### Returns detailed error responses for:
###### Invalid requests (e.g., missing user_id or amount).
###### Database issues (e.g., user not found).


# Future Enhancements
## Authentication:
>Add user authentication for secure access to wallets.

## Transaction History:
> Store and display a history of transactions for each user.

## Improved UI/UX:
###### Add toast notifications for success and error feedback.
###### Enhance responsiveness for mobile devices.

## Validation:
> mplement stricter validation on the backend and frontend to prevent incorrect inputs.

## Deployment:
> Host the application on platforms like AWS, Heroku, or Vercel for live use.


# License
> This project is licensed under the MIT License. See the LICENSE file for details.


# Author
> Developed by Pavan Kumar. Contributions and feedback are welcome!
