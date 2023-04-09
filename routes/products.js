const router = require('express').Router()

// Your code goes here!

//Here i require the File System from Node.js
const fs = require( 'fs' );
// const { allowedNodeEnvironmentFlags } = require('process');

// I Parse my JSON File and introduce it intp the allProducts const
const allProducts = JSON.parse( fs.readFileSync('./db/products.json') );

// 1 Here i return all the products
// localhost:4000/products
router.get( '/', (req, res, next) =>{
    const productsDB = allProducts.map( (element, index, allProducts) => element.title );

    res.status( 200 ).json({
        success: true,
        data   : productsDB,
    });

});

// 3 Return the products just for STOCK <= stock.max
// GET /products/stock?max=50
router.get( '/stock', ( req, res, next ) => {
    const query = parseInt(req.query.max);
    const productsDB = allProducts.filter( element => element.stock <= query );

    res.status( 200 ).json({
        success : true,
        data    : productsDB,
    })

});

// 4 Return all products of a specific category
// GET /products/category?name=fragrances
router.get( '/category',( req, res, next ) =>{

    const query = req.query.name;
    const productsDB = allProducts.filter( element => element.category === query );

    res.status( 200 ).json({
        success : true,
        data    : productsDB, 
    });

});

// Take the 3 products with the best discount (higher discountPercentage):
// GET /products/sales
router.get( '/sales', (req, res, next) => {

    let productsDB = allProducts.sort( (x,y) =>{
        x.discountPercentage < y.discountPercentage ? -1 : 1
    });

    productsDB = productsDB.slice(0,3);
    
    res.status( 200 ).json({
        success : true,
        data    : productsDB,
    });

});

// 2 (according the exercisce) Here i choose a product by the ID
// localhost:4000/products/id
router.get( '/:id', (req, res, next) => {

    const id = parseInt( req.params.id );
    const chooseProduct = allProducts.filter( element => element.id === id );

    res.status(200).json({
        success : true,
        data    : chooseProduct,
    })

});


// Add a new product (Do not forget its ID)
// POST /products
router.post( '/', (req, res, next) =>{
    
    const newProperty = Object.entries(req.body);

    newProperty.unshift( ["id",  allProducts.length + 1]);

    const newProduct = Object.fromEntries( newProperty );
    
    allProducts.push(newProduct);

    fs.writeFileSync( "./db/products.json", JSON.stringify(allProducts, null, 2) );

    res.status(200).json({
        success : true,
        data    : newProduct,
    });

});

// Modify a product: Dado un id, modifica ese producto con la información recibida en el body.
// PUT /products/:id
router.put('/products/:id', (req, res, next) => {
    //TODO:


    res.status( 200 ).json({
        success: true,
    })

});

// Given an ID, delete that item:
// DELETE /products/:id

router.delete('/:id', ( req, res, next ) => {

    for (let index = 0; index < allProducts.length; index++){
        if ( parseInt(req.params.id) === allProducts[index].id ){
            allProducts.splice(index,1);
        }
    }

    fs.writeFileSync( "./db/products.json", JSON.stringify( allProducts, null, 2 ) );

    res.status( 200 ).json({
        success: true,
        data   : "Great! We've delete the product requested!" 
    });
});


module.exports = router

