Expense Tracker Backend

Description
REST API backend for Expense Tracker built using Node.js, Express, MySQL, and JWT authentication.

## Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Add Transaction
- Get Transactions
- Update Transaction
- Delete Transaction
- Dashboard Summary
- Category-wise Expense Summary
- Recent Transactions API
- Current Logged-in User API
- MySQL Database Integration

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- bcrypt
- dotenv
- cors

## API Endpoints

POST /auth/register
POST /auth/login

GET /users/me
GET /users
DELETE /users/:id

POST /transactions
GET /transactions
PUT /transactions/:id
DELETE /transactions/:id

GET /dashboard/summary
GET /dashboard/category-summary
GET /dashboard/recent-transactions

## Setup

npm install
npm run dev

## Deployment Platforms

Backend : Render (https://expensetracker-backend-lvzi.onrender.com)
Database : Railway (MySQL)

## Project Structure

ExpenseTracker-backend/
│
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── transactionController.js
│ └── dashboardController.js
│
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── transactionRoutes.js
│ └── dashboardRoutes.js
│
├── middleware/
│ └── authMiddleware.js
│
├── db/
│ ├── db.js
│ └── tables.js
│
├── .env
├── server.js
├── package.json
