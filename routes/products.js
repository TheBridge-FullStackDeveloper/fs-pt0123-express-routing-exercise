const router = require('express').Router()
const fs = require('fs')
// Your code goes here!

router.get('/', (req, res, next) => {

    fs.readFileSync('./db/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
          }
      
    res.send(data)    
    res.status(200).json({
        success: true,
        data: {
            message: 'response from GET "/products" endpoints',
        }
    })
})
})

router.get('/stock', (req, res, next) => {
    fs.readFileSync('./db/products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
          }           
            res.send(data)

            res.status(200).json({
                success: true,
                data: req.query
          
        })
      })  
    })

    router.get('/category', (req, res, next) => {
        fs.readFileSync('./db/products.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
              }           
                res.send(data)
    
                res.status(200).json({
                    success: true,
                    data: req.query
              
            })
          })  
        })    



router.get('/:id', (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'response from GET "/products/:id" endpoints',
            productsId: req.params.id,
        }
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'response from POST "/products" endpoint',
            bodyReceived: req.body,
        }
        
    })
})
module.exports = router