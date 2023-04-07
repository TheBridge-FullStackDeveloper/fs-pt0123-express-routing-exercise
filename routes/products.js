const router = require('express').Router()

const fs = require("fs")

router.get("/", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    if (error) {
      console.log("no se pueden leer los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);

    return res.json(products)

  })
})


router.get("/:id", (req, res, next) => {

  fs.readFile("./db/products.json", (error, datos) => {
    const id = req.params.id;
    if (error) {
      console.log("No se pueden leer los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);
    const product = products.find((elemento) => elemento.id == id);
    return res.json(product);

  });

});



router.get("/stock", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    const stock = parseInt(req.query.max);
    if (error) {
      console.log("No se pueden acceder los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);
    const filterProducts = products.filter(elemento => elemento.stock <= stock)
    res.send(filterProducts)

  });
});

router.get("/category", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    const name = req.query.name;
    if (error) {
      console.log("No se pueden acceder a los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);
    const filterCategory = products.filter((elemento) => elemento.category == name)
    res.json(filterCategory)
  })
})


module.exports = router