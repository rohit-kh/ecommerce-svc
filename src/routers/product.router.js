const express = require('express')
const {permit} = require('../middleware/authorization')
const productController = require('../controller/product.controller')
const constants = require('../utils/constants')
const router = new express.Router()

router.post('/', permit(constants.ADMIN), productController.create)

router.get('/', permit(constants.ADMIN), productController.getAll)

router.get('/store/:storeId', permit(constants.ADMIN), productController.getAllByStoreId)

router.get('/:id', permit(constants.ADMIN), productController.getOne)

router.patch('/:id', permit(constants.ADMIN), productController.update)

router.delete('/:id', permit(constants.ADMIN), productController.destroy)

module.exports = router