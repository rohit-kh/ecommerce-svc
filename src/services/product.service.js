const Product = require('../models/product.model')

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
    return await Product.find({ownerId: req.user._id, storeId: req.params.storeId})
}

const getOne = async (req) => {
    const product = await Product.findOne({_id: req.params.id, ownerId: req.user._id})
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

    const _id = req.params.id
    const product = await Product.findOne({_id, ownerId: req.user._id})
    
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