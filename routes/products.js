const router = require('express').Router()

// Your code goes here!
const TypeProducts = require("../db/products.json")
// Devolver todos los productos
router.get("/types", (req, res, next) => {
    console.log("Estos son tus productos")
    res.status(200).json({
        success: true,
        data: TypeProducts
    })
})
// Devuelve todos los productos que tengan un stock inferior o igual que el indicado por query string
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
// Devuelve todos los productos que sean de una categoría determinada
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
// Saca los 3 productos con el mayor descuento
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
// Dado un id, devuelve solo ese produc
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
// Añade un producto nuevo (no olvides su id):
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

// Dado un id, elimina ese producto
router.delete("/:id", (req, res, next) => {
    console.log("eliminas producto")
    const deleteProduct = TypeProducts.filter(obj => obj.id.toString() !== req.params.id)

    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/products/:id" endpoint',
            productsId: deleteProduct
        }
    })
})



module.exports = router