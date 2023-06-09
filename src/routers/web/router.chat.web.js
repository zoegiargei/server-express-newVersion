import { Router } from 'express'
import { authenticationJwtWeb } from '../../middlewares/authentication/jwt/auth.byJwt.web.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'

const routerChatWeb = Router()

routerChatWeb.get('/', authenticationJwtWeb, authenticationByRole(['User']), async (req, res) => {
    const user = req.user
    res.render('chat', { title: 'Chat Websocket', loggedin: user })
})

export default routerChatWeb
