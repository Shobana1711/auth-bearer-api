# Auth Bearer API

User registration, login and protected routes using **JWT Bearer tokens**.
Built with Node.js, Express.js, Mongoose (MongoDB) and documented with a Postman collection.

## Project structure (MVC)

```
server.js                    entry point (loads env, connects DB, starts server)
src/
  app.js                     Express app, routes, error middleware
  config/db.js               MongoDB connection
  models/User.js             Mongoose model (hashes password on save)
  views/userView.js          JSON response shapes (never exposes password)
  controllers/               authController.js, userController.js
  routes/                    authRoutes.js, userRoutes.js
  middleware/                auth.js (JWT + roles), validate.js, errorHandler.js
  utils/                     ApiError, asyncHandler
postman/                     Postman collection
```

## Setup

1. Install Node.js 18+ and MongoDB (local or Atlas).
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
4. `npm start` (or `npm run dev` to auto-reload). Server runs on `http://localhost`.

## Endpoints

| Method | Endpoint             | Auth           | Description                               |
|--------|----------------------|----------------|-------------------------------------------|
| POST   | /api/auth/register   | Public         | Register (password hashed with bcrypt)    |
| POST   | /api/auth/login      | Public         | Verify credentials, returns JWT           |
| GET    | /api/users/me        | Bearer token   | User info decoded from the token          |
| GET    | /api/users           | Bearer + admin | List all users (authorization example)    |

Send the token as: `Authorization: Bearer <token>`

## Postman

Import `postman/Auth-Bearer-API.postman_collection.json`. The collection has a `baseUrl` variable,
and the **Login** request automatically saves the token into a `token` variable that the protected
requests use as their Bearer token. Each request includes saved example responses.

## Making an admin

Registration always creates a `user` role (prevents privilege escalation). To test the admin route,
promote a user in the Mongo shell:

then log in again to get a token carrying the new role.
