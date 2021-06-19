const userService = require('../services/user.service')
const {success, error} = require('../utils/response-api')
const storeService = require('../services/store.service')
const storeUserService = require('../services/storeUser.service')

const createAdmin = async (req, res) => {
	try{
        const user = await userService.createAdmin(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const createUser = async (req, res) => {
	try{
		req.params['id'] = req.body.storeId
		const store = await storeService.getOne(req);
		if(!store){
			throw new Error('Invalid storeId')
		}
        const user = await userService.createUser(req)
		req.body.storeId = req.body.storeId
		req.body.userId = user._id
		await storeUserService.create(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getOne = async (req, res) => {
	try{
        const user = await userService.getOne(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getMyProfile = async (req, res) => {
	try{
        const user = await userService.getMyProfile(req)
		return res.status(200).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const logout = async (req, res) => {
	try{
        await userService.logout(req)
		return res.status(200).send(success())
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const logoutAll = async (req, res) => {
	try{
        await userService.logoutAll(req)
		return res.status(200).send(success())
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

const login = async (req, res) => {
	try{
        const data = await userService.login(req)
		return res.status(200).send(success(data))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

const updateMyProfile = async (req, res) => {
	try{
        const data = await userService.updateMyProfile(req)
		return res.status(200).send(success(data))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

module.exports = {
    createAdmin,
	createUser,
    getMyProfile,
    logout,
    logoutAll,
    login,
	updateMyProfile,
	getOne
}