# Simple Authentication REST API with Node.js and Express


## About

Simple REST API with Node.js and Express, which includes some basic operations like:
- register a user - /api/users
- verify user's email address - /api/users/verify/:id/:verificationCode
- send forgot password email - /api/users/forgotpassword
- reset password - /api/users/resetpassword/:id/:passwordresetCode
- get current user - /api/users/me
- login user
- grant access token and refresh tokens - /api/session, /api/session/refresh

### Project stack

- Node.js 16.17.0
- Express ^5.0.0-beta.1
- Typescript ^4.7.4
- Mongodb, Mongoose
- Nodemailer
- Zod
- Winston