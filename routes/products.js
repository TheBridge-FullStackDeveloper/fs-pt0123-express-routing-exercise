const router = require('express').Router();

const products = require('../queries/products');
router.get('/', async (req, res, next) => {
  const content = await products.selectAll();
  if (!content.ok) {
    next({ statusCode: 500, error: new Error('something went wrong') });
  } else {
    res.status(200).json({
      success: true,
      data: content,
    });
  }
});

module.exports = router;
  // Return products with stock less than or equal to the specified max value
router.get('/products/stock', (req, res) => {
    const maxStock = req.query.max ? parseInt(req.query.max) : 50;
  
    if (isNaN(maxStock)) {
      res.status(400).json({ error: 'Invalid query parameter' });
    } else {
      const filteredProducts = products.filter(p => p.stock <= maxStock);
      res.json(filteredProducts);
    }
  });
  
  // Return all products in a specified category
  router.get('/products/category', (req, res) => {
    const categoryName = req.query.name;
  
    if (!categoryName) {
      res.status(400).json({ error: 'Missing category name in query parameter' });
    } else {
      const filteredProducts = products.filter(p => p.category === categoryName);
      res.json(filteredProducts);
    }
  });
  
  // Return top 3 products with the highest discountPercentage
  router.get('/products/sales', (req, res) => {
    const sortedProducts = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const topProducts = sortedProducts.slice(0, 3);
    res.json(topProducts);
  });
  
  // Add a new product
  router.post('/products', (req, res) => {
    const newProduct = req.body;
  
    if (!newProduct.id) {
      res.status(400).json({ error: 'Missing product ID' });
    } else {
      products.push(newProduct);
      res.status(201).json(newProduct);
    }
  });
  
  // Update a product by ID (only update fields that exist in the original product)
  router.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex(p => p.id === id);
  
    if (productIndex !== -1) {
      Object.keys(updatedProduct).forEach(key => {
        if (products[productIndex].hasOwnProperty(key)) {
          products[productIndex][key] = updatedProduct[key];
        }
      });
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  // Delete a product by ID
  router.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
  
    if (productIndex !== -1) {
      const removedProduct = products.splice(productIndex, 1);
      res.json(removedProduct[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  module.exports = router;