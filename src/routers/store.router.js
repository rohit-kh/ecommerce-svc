const express = require('express')
// const Store = require('../models/store.model')
const auth = require('../middleware/auth')
const {permit} = require('../middleware/authorization')
const store = require('../services/store.service')
const storeController = require('../controller/store.controller')
const constants = require('../utils/constants')
const router = new express.Router()

router.post('/', permit(constants.ADMIN), storeController.create)

router.get('/', permit(constants.ADMIN), storeController.getAll)

router.get('/:id', permit(constants.ADMIN), storeController.getOne)

router.patch('/:id', permit(constants.ADMIN), storeController.update)

router.delete('/:id', permit(constants.ADMIN), storeController.destroy)

module.exports = router