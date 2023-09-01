const express = require('express');
const router = express.Router()
const MyControllers = require('../controllers/controllers')

router.get('/',MyControllers.getApi)
router.post('/add-user',MyControllers.registerUser)
router.post('/login-user',MyControllers.loginUser)
router.post('/add-product',MyControllers.addProduct)
router.get('/get-products',MyControllers.getAllProducts)
router.post('/add-to-cart',MyControllers.addToCart)
router.get('/get-cart-count',MyControllers.getCartCountByUserID)
router.get('/get-cart-with-products',MyControllers.getCartProducts)
router.post('/update-cart-quantity',MyControllers.updateCartQuantity)

module.exports =router;