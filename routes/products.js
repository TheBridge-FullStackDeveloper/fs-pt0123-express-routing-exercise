const router = require('express').Router()

// Your code goes here!
const TypeProducts = require("../db/products.json")

router.get("/types", (req, res, next) => {
    console.log("Estos son tus productos")
    res.status(200).json({
        success: true,
        data: TypeProducts
    })
})

router.get("/stock", (req, res, next) => {
    console.log("esto son los stocks")
    const stockContainer = TypeProducts.filter(obj => obj.stock <= req.query.max)
    console.log(stockContainer)
    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/products/stock?max=50" endpoint',
            stocks: stockContainer,
        }

    })
})

router.get("/category", (req, res, next) => {
    console.log("esto son las categorías")
    const Container = TypeProducts.filter(obj => obj.category = req.query.name)
    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/category/stock?name=fragrances" endpoint',
            stocks: Container,
        }

    })
})

router.get("/sales", (req, res, next) => {
    console.log("estos son los descuetos")
    const container = TypeProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const maxDiscountSales = container.slice(0, 3)

    res.status(200).json({
        success: true,
        data: {
            message: 'response from GET "/products/sales" endpoint',
            stocks: maxDiscountSales,
        }

    })
})

router.get("/:id", (req, res, next) => {
    console.log("estos son los id")
    const container = TypeProducts.filter(obj => obj.id.toString() === req.params.id)
    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/products/:id" endpoint',
            productsId: container,
        }

    })
})

router.post('/new', (req, res, next) => {
    console.log("nuevo producto")
    res.status(200).json({
        success: true,
        data: {
            message: 'response from POST "/products" endpoint',
            bodyReceived: req.body,
        }
    })
})

// router.put("/:id",(req,res,next) => {
//     console.log("modificacion de producto")
//     const idProducts = req.params.id
//     const bodyProducts = req.body
//     console.log(idProducts)
//     console.log(bodyProducts)
//     res.status(200).json({
//         success : true,
//         data: {
//             message: 'response from PUT "/:id" endpoint',
//             NewBody: req.body
//         }
//     })
//  })


router.delete("/:id", (req, res, next) => {
    console.log("eliminas producto")
    const deleteProduct = TypeProducts.filter(obj => obj.id.toString() !== req.params.id)
    console.log(deleteProduct)
    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/products/:id" endpoint',
            productsId: deleteProduct
        }
    })
})



module.exports = router