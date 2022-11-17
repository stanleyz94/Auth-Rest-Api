# Simple Authentication REST API with Node.js and Express


## About

Simple REST API with Node.js and Express, which includes some basic operations like:


- Register a user - /api/users
- Verify user - /api/users/verify/:id/:verificationCode
- Request reset password email - /api/users/forgotpassword
- Reset password - /api/users/resetpassword/:id/:passwordresetCode
- Get current user - /api/users/me
- Login user - /api/session
- Grant refresh tokens - /api/session/refresh

API Docs are available on

    -  http://localhost:1111/api-docs


### Project stack

- Node.js 16.17.0
- Express ^5.0.0-beta.1
- Typescript ^4.7.4
- Mongodb, Mongoose
- Nodemailer
- Zod
- Winston

## Project Setup

In your terminal

    - docker compose up             (set ups whole app  - api and database)

