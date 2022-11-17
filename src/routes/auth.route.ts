import express from 'express'
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/auth.controller'
import validateResource from '../middleware/validateResource:'
import { createSessionSchema } from '../schema/auth.schema'

const router = express.Router()

  /**
   * @openapi
   * '/api/session':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Creates session for user
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *       200:
   *         description: Session created successfuly
   *         content:
   *           application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateSessionResponse'
   *       409:
   *         description: Conflict
   *       400:
   *         description: Bad request
   */


router.post('/api/session', validateResource(createSessionSchema), createSessionHandler)

  /**
   * @openapi
   * '/api/session/refresh':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Refresh session for user
   *     parameters:
   *     - in: header
   *       name: x-refresh
   *       required: true
   *       schema:
   *         type: string
   *     responses:
   *       200:
   *         description: Session refreshed successfuly
   *         content:
   *           application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateRefreshSessionResponse'
   *       401:
   *         description: Unauthorized
   */



router.post('/api/session/refresh', refreshAccessTokenHandler)

export default router