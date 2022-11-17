import express from 'express'
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller'
import requireUser from '../middleware/requireUser'
import validateResource from '../middleware/validateResource:'
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema'

const router = express.Router()

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   *      500:
   *        description: Something went wrong
   */

router.post('/api/users', validateResource(createUserSchema), createUserHandler)


  /**
   * @openapi
   * '/api/users/verify/{id}/{verificationCode}':
   *  post:
   *     tags:
   *     - User
   *     summary: Verify account
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *        schema:
   *         type: string
   *      - name: verificationCode
   *        in: path
   *        description: The verificationCode of the user
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *         description: User successfuly verified
   *         content:
   *          text/plain:
   *           schema:
   *              type: string
   *              example: User successfuly verified
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */


router.post('/api/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler)

  /**
   * @openapi
   * '/api/users/forgotpassword':
   *  post:
   *     tags:
   *     - User
   *     summary: Remind a password
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/ForgotPasswordInput'
   *     responses:
   *       200:
   *         description: Password reset email has been sent
   *         content:
   *          text/plain:
   *           schema:
   *              type: string
   *              example: 'If a user with that email is registered you will receive a password reset email'
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */


router.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler)

  /**
   * @openapi
   * '/api/users/resetpassword/{id}/{passwordResetCode}':
   *  post:
   *     tags:
   *     - User
   *     summary: Reset password
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/ResetPasswordInput'
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the user
   *        required: true
   *        schema:
   *         type: string
   *      - name: passwordResetCode
   *        in: path
   *        description: The password reset code of the user
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *         description: Password successfuly reseted
   *         content:
   *          text/plain:
   *           schema:
   *              type: string
   *              example: Successfully updated password
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */


router.post('/api/users/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler)


  /**
   * @openapi
   * '/api/users/me':
   *  get:
   *     tags:
   *     - User
   *     summary: Get current user
   *     security:
   *     - bearerAuth: []
   *     parameters:
   *     - in: header
   *       name: Authorization
   *       required: true
   *       schema:
   *         type: string
   *         example: Bearer AcC45sT0k4n
   *     responses:
   *       200:
   *         description: Current user granted
   *         content:
   *           application/json:
   *              schema:
   *                $ref: '#/components/schemas/GetCurrentUserResponse'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */


router.get('/api/users/me', requireUser, getCurrentUserHandler)


export default router