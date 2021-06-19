const productService = require('../services/product.service')
const {success, error} = require('../utils/response-api')

const create = async (req, res) => {
	try{
        const product = await productService.create(req)
		return res.status(201).send(success(product))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getAll = async (req, res) => {
	try{
        const products = await productService.getAll(req)
		return res.status(200).send(success(products))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getAllByStoreId = async (req, res) => {
	try{
        const products = await productService.getAllByStoreId(req)
		return res.status(200).send(success(products))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const getOne = async (req, res) => {
	try{
        const product = await productService.getOne(req)
		return res.status(200).send(success(product))
	}catch (e){
        res.status(400).send(error(e.message))
	}
}

const destroy = async (req, res) => {
	try{
        const product = await productService.destroy(req)
		return res.status(200).send(success(product))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

const update = async (req, res) => {
	try{
        const product = await productService.update(req)
		return res.status(200).send(success(product))
	}catch (e){
		res.status(400).send(error(e.message))
	}
}

module.exports = {
    create,
    getAll,
	getAllByStoreId,
    getOne,
    destroy,
    update
}