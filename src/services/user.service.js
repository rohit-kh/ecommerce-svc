const User = require('../models/user.model')
const constants = require('../utils/constants')


const create = async (req) => {
    const user = new User({
        ...req.body,
        role: constants.ADMIN
    })
    user['owner'] = user._id
    return await user.save()
}

const getMyProfile = async (req) => {
    return req.user
}

const getOne = async (req) => {
    return await User.findOne({_id: req.params.id})
}

const updateMyProfile = async (req) => {
    const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation){
		throw new Error('Invalid updates!')
	}

    updates.forEach((update) => req.user[update] = req.body[update])
	await req.user.save()
	
    return req.user
}

const logout = async (req) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()
    return null
}

const logoutAll = async (req) => {
    req.user.tokens = []
	await req.user.save()
    return null
}

const login = async (req) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
	const token = await user.generateAuthToken()
	return {user, token}
}

module.exports = {
    create,
    getOne,
    getMyProfile,
    updateMyProfile,
    logout,
    logoutAll,
    login
}