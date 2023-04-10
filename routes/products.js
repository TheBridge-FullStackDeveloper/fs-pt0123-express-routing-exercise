const router = require('express').Router()

const fs = require("fs");

router.put("/products/:id", (req, res) => {
  fs.readFile("./db/products.json", "utf-8", (error, datos) => {
    if (error) {
      console.log(erorr);
      res.status(500).send("error al leer el archivo de productos");
      return;
    }
    const products = JSON.parse(datos);
    const productToMod = products.find(producto => producto.id === parseInt(req.params.id));
    if (productToMod) {
      Object.keys(req.body).forEach(key => {
        if (productoModificado.hasOwnProperty(key)) {
          productoModificado[key] = req.body[key];
        }
      });
      fs.writeFile('./db/products.json', JSON.stringify(products), 'utf8', error => {
        if (error) {
          console.log(error);
          res.status(500).send("error al escribir el archivo JSON");
        }
        res.status(200).send("objeto agrefado exitosamente");
      })
    }
  })
})



router.post("/products", (req, res, next) => {
  fs.readFile("./db/products.json", "utf-8", (error, datos) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al leer el archivo de productos'
      });
      return;
    }

    const products = JSON.parse(datos)
    let nuevoProducto={
      id:products.length + 1,
      ...req.body
    };

    products.push(nuevoProducto)
    fs.writeFile('./db/products.json', JSON.stringify(products), 'utf8', error => {
      if (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "error al escribir el archivo JSON"
        });
      }
      res.status(200).json({
        ok: true,
        msg: "objeto agrefado exitosamente",
        producto:nuevoProducto

      });
    })
  })
})

router.get("/sales", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    if (error) {
      console.log("error la obtener la peticion", error);
    }
    const products = JSON.parse(datos);
    const productsOrdenados = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const tresPrimeros = productsOrdenados.slice(0, 3)
    res.json(tresPrimeros)
  })
})

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



router.get("/stock", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    const stock = parseInt(req.query.max);
    if (error) {
      console.log("No se pueden acceder los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);
    const filterProducts = products.filter(elemento => elemento.stock <= stock)
    res.json(filterProducts)

  });
});

router.get("/", (req, res, next) => {
  fs.readFile("./db/products.json", (error, datos) => {
    if (error) {
      console.log("no se pueden leer los archivos de este fichero", error);
    }
    const products = JSON.parse(datos);
    console.log(products)
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


module.exports = router

