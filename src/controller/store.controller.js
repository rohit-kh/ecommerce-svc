const storeService = require('../services/store.service')
const {success, error} = require('../utils/response-api')

const create = async (req, res) => {
	try{
        const store = await storeService.create(req)
		return res.status(201).send(success(store))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getAll = async (req, res) => {
	try{
        const stores = await storeService.getAll(req)
		return res.status(200).send(success(stores))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getOne = async (req, res) => {
	try{
        const store = await storeService.getOne(req)
		return res.status(200).send(success(store))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const destroy = async (req, res) => {
	try{
        const store = await storeService.destroy(req)
		return res.status(200).send(success(store))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

const update = async (req, res) => {
	try{
        const store = await storeService.update(req)
		return res.status(200).send(success(store))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

module.exports = {
    create,
    getAll,
    getOne,
    destroy,
    update
}