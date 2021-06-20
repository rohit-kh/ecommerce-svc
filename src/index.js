const express = require('express')
require('./db/mongoose')
const auth = require('./middleware/auth')
const userRouter = require('./routers/user.router')
const storeRouter = require('./routers/store.router')
const productRouter = require('./routers/product.router')

const app = express()
const port = process.env.PORT

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(express.json())
app.use(auth)
app.use('/users', userRouter)
app.use('/stores', storeRouter)
app.use('/products', productRouter)

app.listen(port, () => {
	console.log('Server is up on port ' + port)
	console.log('Server Environment ' + process.env.NODE_ENV)
	console.log('Server Environment ' + process.env.MONGODBURL)
})

