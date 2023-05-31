/* eslint-disable camelcase */
import { Router } from 'express'
import { contrLogin, contrLogout, contrGetCurrent } from '../../controllers/api/sessions.controller.js'
import { authenticationByGithub, authenticationByGithub_CB, loginAuthentication } from '../../middlewares/passport/passport.strategies.js'
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js'
import { contrLoggedIn } from '../../controllers/web/sess.web.controller.js'

const routerSession = Router()

routerSession.post('/login', loginAuthentication, contrLogin)
routerSession.get('/github', authenticationByGithub)
routerSession.get('/githubcallback', authenticationByGithub_CB, contrLoggedIn)

routerSession.get('/current', authenticationJwtApi, contrGetCurrent)

routerSession.post('/logout', authenticationJwtApi, contrLogout)

export default routerSession
