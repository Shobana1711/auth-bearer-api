# Auth Bearer API

User authentication and authorization using **JWT Bearer tokens**, built with **Node.js, Express.js and Mongoose (MongoDB)** following the **MVC pattern**, and documented in **Postman**.

## Live Demo & API Documentation

- **Live URL (Render):** https://auth-bearer-api-1.onrender.com/
- **Postman Documentation:** https://documenter.getpostman.com/view/54478578/2sBYHSyLiq
> Render's free tier sleeps when idle, so the first request may take 30-50 seconds.

## Features

- User registration with validation; password hashed with **bcrypt** before saving
- User login that verifies credentials and returns a **JWT**
- Middleware that verifies the Bearer token, decodes it and attaches the user to `req.user`
- Protected route that returns the user's information from the token
- Role-based authorization example (admin-only route)
- Centralized error handling and request validation (`express-validator`)
- Postman collection with sample requests and responses for every endpoint

## Tech Stack

Node.js, Express.js, Mongoose (MongoDB Atlas), JSON Web Token (`jsonwebtoken`), bcryptjs, express-validator, Postman

## Project Structure (MVC)

```
server.js                    Entry point (loads env, connects DB, starts server)
src/
  app.js                     Express app, routes, error middleware
  config/db.js               MongoDB connection
  models/User.js             Model: User schema, password hashing, password compare
  views/userView.js          View: JSON response shapes (password is never exposed)
  controllers/
    authController.js        register, login
    userController.js        getMe, getAllUsers
  routes/
    authRoutes.js            /api/auth/*
    userRoutes.js            /api/users/*
  middleware/
    auth.js                  verifyToken (JWT) and authorizeRoles
    validate.js              Input validation rules
    errorHandler.js          404 and global error handler
  utils/                     ApiError, asyncHandler
postman/                     Postman collection (sample requests and responses)
```

## Setup (Local)

1. Install Node.js 18+ and MongoDB (local or Atlas).
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
4. `npm start` (or `npm run dev` to auto-reload). Server runs on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint           | Access         | Description                                |
|--------|--------------------|----------------|--------------------------------------------|
| GET    | /                  | Public         | Server status check                        |
| POST   | /api/auth/register | Public         | Register a new user (password is hashed)   |
| POST   | /api/auth/login    | Public         | Verify credentials and return a JWT        |
| GET    | /api/users/me      | Bearer token   | Get the logged-in user's info from token   |
| GET    | /api/users         | Bearer + admin | List all users (authorization example)     |

Send the token in the header: `Authorization: Bearer <token>`

1. Register: POST /api/auth/register
2. Login: POST /api/auth/login
3. Get My Info (protected): GET /api/users/me
4. List All Users (admin only): GET /api/users

## Error Handling and Validation

| Status | Meaning                                                |
|--------|--------------------------------------------------------|
| 400    | Validation failed / invalid JSON body                  |
| 401    | Missing, invalid or expired token; wrong credentials   |
| 403    | Authenticated but not allowed (role check)             |
| 404    | Route not found                                        |
| 409    | Username or email already exists                       |
| 500    | Internal server error                                  |

Validation rules: username 3-30 characters, valid email, password at least 6 characters.

## Postman

1. Open the published **Postman Documentation** link above, or import `postman/Auth-Bearer-API.postman_collection.json`.
2. The collection uses a `baseUrl` variable (set to the Render live URL; change it to `http://localhost:5000` for local testing).
3. Run in this order: **Register**, then **Login** (the token is saved automatically into the `token` variable), then **Get My Info**.
4. Every request includes a description and saved example responses (success and error cases).

## Making an Admin

Registration always creates the `user` role (this prevents privilege escalation). To test the admin route, promote a user in the Mongo shell or Atlas:

Then log in again to get a token carrying the new role.

## Deployment

Deployed on **Render** (backend) with **MongoDB Atlas**.