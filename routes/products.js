const router = require('express').Router()
const products = require('../queries/products')

const clientResponse = ({ ok, content }, res, next) => {
    if(!ok) return next({
        statusCode: 500,
        error: new Error('something went wrong!')
    })

    res.status(200).json({
        success: true,
        data: content,
    })
}

router.get('/', async (req, res, next) => {
    const store = await products.selectAll()
    clientResponse(store, res, next)
})

router.get('/stock', async (req, res, next) => {
    const store = await products.selectManyByStock(req.query.max)
    clientResponse(store, res, next)
})

router.get('/category', async (req, res, next) => {
    const store = await products.selectManyByCategory(req.query.name)
    clientResponse(store, res, next)
})

router.get('/sales', async (req, res, next) => {
    const { limit } = req.query
    const store = await products.sortBySales({ limit })
    clientResponse(store, res, next)
})

router.get('/:id', async (req, res, next) => {
    const store = await products.selectOneById(req.params.id)
    clientResponse(store, res, next)
})

router.post('/', async (req, res, next) => {
    const store = await products.insertOne(req.body)
    clientResponse(store, res, next)
})

router.put('/:id', async (req, res, next) => {
    const store = await products.updateOne(req.params.id, req.body)
    clientResponse(store, res, next)
})

router.delete('/:id', async (req, res, next) => {
    const store = await products.deleteOne(req.params.id)
    clientResponse(store, res, next)
})

module.exports = router