import tokenDbDAO from '../DAO/DB_DAOs/Tokens.DAO.db.js'
import Token from '../models/Token.js'
import encryptedJWT from '../utils/jwt/encrypted.jwt.js'
import { v4 as uuidv4 } from 'uuid'
import { winstonLogger } from '../middlewares/loggers/logger.js'

class TokenServices {
    constructor (tokenDAO) {
        this.tokenDAO = tokenDAO
    }

    async createToken (userId) {
        const ttl = '1h'
        const randomScript = uuidv4()
        const token = new Token(userId, encryptedJWT.encryptData(randomScript, ttl))
        return token
    }

    async getTokenByUserId (uid) {
        const tokenInDb = await this.tokenDAO.findElementsByQuery({ userId: uid })
        return tokenInDb
    }

    async validateEqualsTokens (tk) {
        const tokenInDb = await this.tokenDAO.findElementsByQuery({ token: tk })
        return tokenInDb
    }

    async saveTockenUpdatePass (uid, token) {
        const tokenInDb = await this.getTokenByUserId(uid)
        if (tokenInDb.length > 0) {
            await this.tokenDAO.deleteElement(tokenInDb._id)
        }
        const resultSave = await this.tokenDAO.creaeteElement(token)
        return resultSave
    }

    async deleteToken (tk) {
        const tokenInDb = await this.tokenDAO.findElementsByQuery({ token: tk })
        const tkId = tokenInDb[0]._id
        winstonLogger.debug(`Token ID for delete token: ${tkId}`)
        return await this.tokenDAO.deleteElement(tkId)
    }
}
const tokenService = new TokenServices(tokenDbDAO)
export default tokenService
