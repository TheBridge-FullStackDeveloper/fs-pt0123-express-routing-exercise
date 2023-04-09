const router = require("express").Router();
const fs = require("fs");
const prod = require("../db/products.json"); // he acabado creando esto porque lo estaba utilizacndo mucho

// Your code goes here!

fs.readFile("./db/products.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

router.get("/", (req, res, next) => {
  fs.readFile("./db/products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error"); // 500 porque indica un error interno del servidor
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

router.get("/stock", (req, res, next) => {
  const stock = req.query.max;
  if (stock) {
    const filterProd = prod.filter((product) => product.stock <= stock);
    res.json(filterProd);
  } else {
    res.json(prod);
  }
});

router.get("/category", (req, res, next) => {
  const category = req.query.category;
  if (category) {
    const filtered = prod.filter((product) => product.category === category);
    res.json(filtered);
  } else {
    res.status(404).send("Product not found");
  }
});

router.get("/sales", (req, res, next) => {
  const arr = [];
  const discounts = [];
  for (let i = 0; i < prod.length; i++) {
    discounts.push(prod[i].discountPercentage);
  }
  const sorted = discounts.sort((a, b) => a - b);
  for (let i = 0; i < prod.length; i++) {
    if (prod[i].discountPercentage === sorted[sorted.length - 3])
      arr.push(prod[i]);
    if (prod[i].discountPercentage === sorted[sorted.length - 2])
      arr.push(prod[i]);
    if (prod[i].discountPercentage === sorted[sorted.length - 1])
      arr.push(prod[i]);
  }
  if (arr.length === 3) {
    res.json(arr);
  } else {
    res.status(404).send("Products not found");
  }
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  fs.readFile("./db/products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).send("Product not found");
      }
    }
  });
});

router.get("/", (req, res, next) => {});

module.exports = router;
