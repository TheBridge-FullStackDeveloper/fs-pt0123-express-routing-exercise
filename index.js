const express = require('express')
const { users, products } = require('./routes')

const PORT = 4000
const app = express()

app.use(express.json())

app.use('/products', products)
app.use('/users', users)

app.use((req, res, next) => {
    next({ statusCode: 404, error: new Error('path not found') })
})

app.use(({ statusCode, error }, req, res, next) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    })
})

app.listen(PORT, () => console.info(`> listening at ${PORT}`))