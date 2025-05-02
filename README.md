# 🛡️ [EJS Template] Full-Stack Authentication System with Google reCAPTCHA

## 🔍 Project Overview

This is a secure full-stack authentication application built with **Node.js**, **PostgreSQL**, **EJS**, and **Google reCAPTCHA**. It allows users to **register**, **log in**, **view a protected profile**, and **log out**, with key security features like password hashing, JWT-based authentication, and bot protection via reCAPTCHA.

### ✨ Key Features

- User Registration with validation
- Login with Google reCAPTCHA verification
- JWT Authentication (valid for 15 minutes)
- Secure password hashing with bcryptJs
- Protected Profile route
- Logout functionality
- Minimal, clean EJS-based UI
- Rate limiting on login

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SinghBanta/ejs-template.git
cd ejs-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL Database

Ensure PostgreSQL is installed and running on your machine.

### 4. Create a `.env` File and fill in the following details:

```env
DB_URL=
JWT_SECRET=secret

RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

BASE_URL=http://localhost:3000

NODE_ENV=development
```

### 2. Run migration command

```bash
npm run migrate
```

### 5. Run the App

```bash
npm start
```

Visit `http://localhost:3000` to start using the application.

---

## 🔌 API Endpoints Overview

BASE_API=/api

| Method | Endpoint         | Description                                          | Protected | reCAPTCHA |
| ------ | ---------------- | ---------------------------------------------------- | --------- | --------- |
| POST   | `/auth/register` | Handles user registration with validations           | ❌        | ❌        |
| POST   | `/auth/login`    | Authenticates user, validates reCAPTCHA & issues JWT | ❌        | ✅        |
| GET    | `/user/profile`  | Renders user profile; requires valid JWT             | ✅        | ❌        |
| GET    | `/auth/logout`   | Logs out user by clearing JWT                        | ✅        | ❌        |

---

## 🖼️ Frontend Routes

| Route       | Template     | Description                          |
| ----------- | ------------ | ------------------------------------ |
| `/register` | register.ejs | Registration form with validations   |
| `/login`    | login.ejs    | Login form + Google reCAPTCHA widget |
| `/profile`  | profile.ejs  | Shows user info & Logout button      |

---

## 🔐 Security

- **bcryptjs** for password hashing.
- **JWT** stored in HTTP-only cookies or Authorization headers.
- **Google reCAPTCHA** to prevent bots.
- **Input validation** on both client and server sides.
- **express-rate-limit** on login route to prevent brute-force attacks.

---

## 🧪 Technologies Used

- Node.js
- Express.js
- PostgreSQL
- bcryptjs
- jsonwebtoken
- dotenv
- EJS
- Google reCAPTCHA
- express-rate-limit

---

## 🚀 Deployment

This project is deployed on:

- [Render](https://ejs-template-3s2b.onrender.com)

---

## 📁 Folder Structure

```
EJS-TEMPLATE/
│
├── config/
│ └── db.js # PostgreSQL database connection
│
├── controllers/
│ ├── auth/
│ │ ├── login.js # Login controller logic
│ │ └── register.js # Registration controller logic
│ └── user/
│ └── profile.js # Profile data retrieval logic
│
├── middlewares/
│ ├── middleware.js # Auth middleware (JWT verification)
│ └── ratelimitMiddleware.js# Rate limiting for login
│
├── models/
│ ├── init.sql # SQL schema for user table
│ └── migrate.js # Script to initialize database
│
├── public/
│ └── css/
│ ├── auth-form.css # Styles for auth forms
│ └── profile.css # Styles for profile page
│
├── routes/
│ ├── api/
│ │ ├── Auth.route.js # Auth routes (login/register)
│ │ └── Profile.route.js # Profile route
│ ├── index.js # Route entry point
│ └── Api.route.js # Combined API routes
│
├── utils/
│ └── (if needed) # Utility functions
│
├── views/
│ ├── index.ejs # Homepage view
│ ├── login.ejs # Login form with reCAPTCHA
│ └── register.ejs # Registration form
│
├── .env # Environment variables
├── .gitignore
├── index.js # Entry point of the app
├── package.json
├── package-lock.json
└── README.md
```

---
