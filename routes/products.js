const router = require('express').Router()


// Your code goes here!

let products = [
    { id: 1, nombre: 'Milk', precio: 1, categoria: 'food', descuento: 0},
    { id: 2, nombre: 'aples', precio: 3, categoria: 'food', descuento: 1},
    { id: 3, nombre: 'perfume', precio: 45, categoria: 'fragance', descuento: 5},
    { id: 4, nombre: 'biscuits', precio: 5, categoria: 'food', descuento: 1},
    { id: 5, nombre: 'jacket', precio: 50, categoria: 'clothes', descuento: 5},
    { id: 6, nombre: 'chicken', precio: 8,categoria: 'food', descuento: 1},
    { id: 7, nombre: 'potatos', precio: 9 , categoria: 'food', descuento: 1},
    { id: 8, nombre: 'shoes', precio: 100, categoria: 'clothes', descuento: 10},
    { id: 9, nombre: 'cheese', precio: 2, categoria: 'food', descuento: 0},
    { id: 10, nombre: 'oil', precio: 25, categoria: 'food', descuento: 2}
];
router.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'listening'
        }
    })
})

router.get('/lista', (req, res, next) => {
   
    res.json(products)
})


router.get('/stock', (req, res, next) => {
  
    const max = parseInt(req.query.max);
    const productsFilter = products.filter(products => products.precio <= max);
    res.json(productsFilter);
})
router.get('/category', (req, res, next) => {
    
    const categoria = req.params.categoria;
    const productsCategoria = products.filter(p => p.categoria === categoria);
    if (productsCategoria.length > 0) {
      res.json(productsCategoria);
    } else {
      res.status(404).send('No se encontraron productos en la categoría especificada');
    }
})

router.get('/sales', (req, res, next) => {

    products.sort((a, b) => b.descuento - a.descuento);

    const productosConMayorDescuento = products.slice(0, 3);

    res.json(productosConMayorDescuento);
})
const product = {
    id: 11,
    nombre: "mouse",
    precio: 50,
    stock: 10,
    categoria: "electronics",
    descuento: 5
}

router.post('/añadir', (req, res, next) => {

    bodyParser.json()

    const producto = req.body;

    lastProductoId += 1;

  producto.id = lastProductId;

  products.push(product);

  res.json(product);
})





router.delete('/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);
  
  
  const lastProductIndex = products.length - 1;
  
 
  
  const lastProductId = products[lastProductIndex].id;
  

    products.pop();
    
    res.json(`Producto con ID ${productId} eliminado correctamente`);
 
});



router.put('/:id', (req, res) => {

    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
  
    products[productIndex].precio = 20;
    productos[productIndex].descuento = 2;
     
    res.json(products[productIndex]);
  });
  

router.get('/:id', (req, res, next) => {

    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json('Producto no encontrado');
    }
})


module.exports = router