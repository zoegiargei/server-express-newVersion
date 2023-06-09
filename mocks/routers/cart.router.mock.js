import { Router } from 'express'
import cartsService from '../../src/services/carts.service.js'
const routerCartsMock = Router()

routerCartsMock.post('/nuevoCarrito', async (req, res, next) => {
    try {
        const newCart = await cartsService.createCart('zoegiargei@gmail.com')
        req.logger.debug(String(newCart))
        res.sendSuccess()
    } catch (error) {
        next(error)
    }
})

routerCartsMock.post('/productoEnCarrito', async (req, res, next) => {
    try {
        const cid = '64635ba6db2ac152268cb18f'
        const pid = '645e4a3cd2703860d39d00cb'
        const quantity = 20
        await cartsService.addToCart(cid, pid, quantity)
        const cart = await cartsService.getCartById(cid)
        res.json({ cart })
    } catch (error) {
        next(error)
    }
})

routerCartsMock.post('/actualizarCantidad', async (req, res, next) => {
    try {
        const cid = '64635ba6db2ac152268cb18f'
        const pid = '645e4a3cd2703860d39d00cb'
        const quantity = 10
        const updated = await cartsService.updateProdInCart(cid, pid, quantity)
        const cartUpdated = await cartsService.getCartById(cid)
        res.json({ updated, cartUpdated })
    } catch (error) {
        next(error)
    }
})

routerCartsMock.delete('/eliminarProductoEnCarrito', async (req, res, next) => {
    try {
        const cid = '64635ba6db2ac152268cb18f'
        const pid = '645e4a3cd2703860d39d00cb'
        await cartsService.delProdInCart(cid, pid)
        const cartUpdated = await cartsService.getCartById(cid)
        res.json({ cartUpdated })
    } catch (error) {
        next(error)
    }
})

routerCartsMock.delete('/eliminarTodosLosProductos', async (req, res, next) => {
    try {
        const cid = '64635ba6db2ac152268cb18f'
        await cartsService.deleteAllProducts(cid)
        const cartUpdated = await cartsService.getCartById(cid)
        res.json({ cartUpdated })
    } catch (error) {
        next(error)
    }
})

routerCartsMock.delete('/eliminarCarrito', async (req, res, next) => {
    try {
        const cid = '64635ba6db2ac152268cb18f'
        const deleteCartResult = await cartsService.deleteCart(cid)
        res.json({ deleteCartResult })
    } catch (error) {
        next(error)
    }
})

export default routerCartsMock
