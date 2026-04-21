# Expense Tracker Backend API

A scalable backend API for the Expense Tracker application, built with Node.js, Express, and MySQL. This service handles user authentication, transaction management, and dashboard analytics.

---

## Features

- User Registration & Login (JWT Authentication)
- Secure Password Hashing (bcrypt)
- Add, Update, Delete Transactions
- Filter & Search Transactions
- Category-wise Expense Analysis
- Total Expense Calculation
- RESTful API structure

---

## Tech Stack

- Node.js
- Express.js
- MySQL (Railway)
- JWT (Authentication)
- bcrypt (Password hashing)

---

🌐 API Endpoints
Auth
POST /auth/register → Register user
POST /auth/login → Login user
Transactions
POST /transactions → Add transaction
GET /transactions → Get all transactions
PUT /transactions/:id → Update transaction
DELETE /transactions/:id → Delete transaction
Dashboard
GET /dashboard/total → Total expenses
GET /dashboard/category → Category-wise expenses

Deployment
Backend deployed on Render
Database hosted on Railway
