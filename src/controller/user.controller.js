const userService = require('../services/user.service')
const {success, error} = require('../utils/response-api')

const create = async (req, res) => {
	try{
        const user = await userService.create(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getOne = async (req, res) => {
	console.log(122)
	try{
        const user = await userService.getOne(req)
		return res.status(201).send(success(user))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getMyProfile = async (req, res) => {
	console.log(1)
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
    create,
    getMyProfile,
    logout,
    logoutAll,
    login,
	updateMyProfile,
	getOne
}