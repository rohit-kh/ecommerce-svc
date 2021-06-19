const mongoose = require('mongoose')
const validator = require('validator')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate(value){
            if(value.toString().length !== 10){
                throw new Error('Phone is invalid')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store