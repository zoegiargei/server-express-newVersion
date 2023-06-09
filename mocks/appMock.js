import express from 'express'
import { winstonLogger } from '../src/utils/loggers/logger.js'
import routerCartsMock from './routers/cart.router.mock.js'
import generatorUserMock from './utils/mocks/generator.user.mock.js'

const apiMock = express()

apiMock.use(express.json())
apiMock.use(express.urlencoded({ extended: true }))

apiMock.use('/carts', routerCartsMock)

function Main () {
    const newUserMock = generatorUserMock.createUserMock()
    winstonLogger.debug(String(newUserMock))
}

Main()
