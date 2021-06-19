const Store = require('../models/store.model')

const create = async (req) => {
    const store = new Store({
        ...req.body,
        owner: req.user._id
    })
    return await store.save()
}

const getAll = async (req) => {
    await req.user.populate({
        path: 'stores'
    }).execPopulate()
    return req.user.stores
}

const getOne = async (req) => {
    await req.user.populate({
        path: 'stores',
        match: {
            _id: req.params.id
        }
    }).execPopulate()
    if(req.user.stores.length === 0){
        throw new Error('Resource not found!')
    }
    return req.user.stores[0]
}

const destroy = async (req) => {
    const store =  await Store.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if(!store){
        throw new Error('Resource not found!')
    }
    return store
}

const update = async (req) => {
    const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'location', 'phone']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
		throw new Error('Invalid updates!')
	}

    const _id = req.params.id
    const store = await Store.findOne({_id, owner: req.user._id})
    
    if(!store){
        throw new Error('Resource not found!')
    }
    updates.forEach((update) => store[update] = req.body[update])
    
    return await store.save()
}

module.exports = {
    create,
    getAll,
    getOne,
    destroy,
    update
}