const mongoose = require('mongoose')

const storeUserSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
})

storeUserSchema.index({storeId: 1, userId: 1}, {unique: true})

const StoreUser = mongoose.model('StoreUser', storeUserSchema)

module.exports = StoreUser