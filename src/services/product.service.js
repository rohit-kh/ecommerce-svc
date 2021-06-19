const Product = require('../models/product.model')
const constants = require('../utils/constants')
const {checkStore} = require('../services/storeUser.service')

const create = async (req) => {
    const product = new Product({
        ...req.body,
        ownerId: req.user._id
    })
    return await product.save()
}

const getAll = async (req) => {
    return await Product.find({ownerId: req.user._id})
}

const getAllByStoreId = async (req) => {
    let query
    if(req.user.role === constants.ADMIN){
        query = {ownerId: req.user._id, storeId: req.params.storeId}
    }else{ 
        await checkStore(req)
        query = {storeId: req.params.storeId}
    }

    const product =  await Product.find(query)
    if(!product){
        throw new Error('Resource not found!')
    }
    return product
}

const getOne = async (req) => {
    let query
    if(req.user.role === constants.ADMIN){
        query = {_id: req.params.id, ownerId: req.user._id}
    } else {
        await req.user.populate({
            path: 'store'
        }).execPopulate()
        query = {storeId: req.user.store[0].storeId, _id: req.params.id}
    }
    const product = await Product.findOne(query)
    if(!product){
        throw new Error('Resource not found!')
    }
    return product
}

const destroy = async (req) => {
    const product =  await Product.findOneAndDelete({_id: req.params.id, ownerId: req.user._id})
    if(!product){
        throw new Error('Resource not found!')
    }
    return product
}

const update = async (req) => {
    const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'category', 'quantity', 'description']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
		throw new Error('Invalid updates!')
	}

    const product = await getOne(req)
    
    if(!product){
        throw new Error('Resource not found!')
    }
    updates.forEach((update) => product[update] = req.body[update])
    
    return await product.save()
}

module.exports = {
    create,
    getAll,
    getAllByStoreId,
    getOne,
    destroy,
    update
}