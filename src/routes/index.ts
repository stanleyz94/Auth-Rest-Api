import express from 'express'
import user from './user.route'
import auth from './auth.route'

const router = express.Router()

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Check if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get('/healthcheck', (_, res) => {
    res.sendStatus(200)
})

router.use(user)
router.use(auth)


export default router