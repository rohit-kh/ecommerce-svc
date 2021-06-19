const StoreUser = require('../models/storeUser.model')

const create = async (req) => {
    const storeUser = new StoreUser({
        ...req.body
    })
    return await storeUser.save()
}

const checkStore = async (req) => {
    console.log(req.user._id, req.params.storeId)
    const checkStore = await StoreUser.findOne({userId: req.user._id, storeId: req.params.storeId})
    if(!checkStore){
        throw new Error('Resource not found!')
    }
    return checkStore
}

module.exports = {
    create,
    checkStore
}