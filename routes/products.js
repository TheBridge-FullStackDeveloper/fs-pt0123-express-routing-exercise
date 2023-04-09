const router = require('express').Router()


const fs = require('fs');
const { parseInt } = require('lodash');
const products = JSON.parse(fs.readFileSync('./db/products.json'));


//Devuelve todos los productos: GET /products
router.get('/', (req, res, next) => {
    const  productArray = products.map((element, index, products)=>element.title);
    res.status(200).json({
        success: true,
        message:'All the products',
        data: {
            productArray,
        }
    })
});

//Devuelve todos los productos que tengan un stock inferior o igual que el indicado por query string: GET /products/stock?max=50
router.get('/stock',(req, res, next)=>{
    const stocksMax = parseInt(req.query.max)
    const productMax = products.filter(element => element.stock);
    productMax <= stocksMax;

    res.status(200).json({
        success: true,
        message:'all products stock less than or equal',
        data: {
            productMax,
        }
    })
});

//Devuelve todos los productos que sean de una categoría determinada:
router.get('/category', (req, res, next)=>{

    const category = parseInt(req.query.name);
    
    const productCategory = products.filter(element => element.category === 'fragrances');
    
    res.status(200).json({
        success: true,
        message:'products by category',
        data:{
            productCategory,
        }
    });
});
//Saca los 3 productos con el mayor descuento (discountPercentage más alto): 
router.get('/sales', (req, res, next) => {
    const topSales = products.reduce((acc, product) => {
      if (acc.length < 3 || product.discountPercentage > acc[acc.length - 1].discountPercentage) {
        acc.push(product);
        acc.sort((a, b) => b.discountPercentage - a.discountPercentage);
        acc = acc.slice(0, 3);
      }
      return acc;
    }, []);
    res.status(200).json({
        success: true,
        message: 'biggest discount',
        topSales,
    });
  });

  //Dado un id, devuelve solo ese producto: GET /products/:id
  router.get('/:id', (req, res, next)=>{
    const id = parseInt(req.params.id);
    const product = products.filter(product => product.id === id)
    res.status(200).json({
        success: true,
        message: 'products',
        product,
    });
  });
  //Añade un producto nuevo
  router.post('/', (req, res, next) => {
    
    const arrProduct = Object.entries(req.body);
    arrProduct.unshift(['id', products.length +1]);
    const newProduct = Object.fromEntries(arrProduct);

    products.push(newProduct);
    //esta parte pensaba que con estar en la parte de arriba no abria que llamarla dentro pero ya entendi el porque 
    fs.writeFileSync('./db/products.json', JSON.stringify(products, null, 2));
    console.log(products.length);

    res.status(200).json({ 
        success: true,
        message: 'new products',
         data: newProduct,
         });
  });


//Dado un id, modifica ese producto con la información recibida en el body.
//esta parte me volvi loco y tuve que mirar ejemplos de como hacerlo.
  router.put('/:id',(req, res, next)=>{
    let newProduct;
    const actualizaValues = (obj1, obj2)=>{
      const newKeys = Object.keys(obj1);
      const newValue = Object.values(obj1);

      for (let i = 0; i < newKeys.length; i++) {
         if (newKeys[i] in obj2){
          obj2[newKeys[i]] = newValue[i];
         }
        
      }
    }
    for (let i = 0; i < products.length; i++) {
      if(products[i].id === parseInt(req.params.id)){
        actualizaValues(req.body, products[i]);
        newProduct = products[i];
      }
      
    }
    fs.writeFileSync('./db/products.json',JSON.stringify(products, null, 2));
    res.status(200).json({
      success: true,
      message: 'Modify product properties',
      data: newProduct,
    });
  });

  //Dado un id, elimina ese producto: 
  router.delete('/:id', (req, res, next)=>{
    for (let i = 0; i < products.length; i++) {
      if(parseInt(req.params.id) === products[i].id){
        products.splice(i,1);
      } 
    }
    fs.writeFileSync('./db/products.json',JSON.stringify(products, null, 2));
    res.status(200).json({
      success: true,
      message: 'remove product from file',
    });
  })
  
// Your code goes here!

module.exports = router