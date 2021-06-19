const express = require('express')
const userController = require('../controller/user.controller')
const {permit} = require('../middleware/authorization')
const constants = require('../utils/constants')
const router = new express.Router()

router.post('/', userController.create)

router.get('/me', userController.getMyProfile)

router.get('/:id', permit(constants.ADMIN), userController.getOne)

router.post('/logout', userController.logout)

router.post('/logoutAll', userController.logoutAll)

router.post('/login', userController.login)

router.patch('/me', userController.updateMyProfile)

module.exports = router