const router = require('express').Router()

// Your code goes here!

const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./db/products.json"));

//Devolver todos los productos
router.get("/", (req, res, next) => {
    const productArray = products.map((element,index,products) => element.title);

    res.status(200).json({
        success: true,
        data: productArray,
    })
})


//Devolver producto por stock (indicando máximo)
router.get("/stock", (req, res, next) => {
    const query = parseInt(req.query.max);
    const productArray = products.filter(element => element.stock <= query);

    res.status(200).json({
        success: true,
        data: productArray,
    })
})


//Devolver producto por categoría
router.get("/category", (req, res, next) => {
    const query = req.query.name;
    const productArray = products.filter(element => element.category === query);

    res.status(200).json({
        success: true,
        data: productArray,
    })
})


//Devolver los tres productos con el descuento más alto

router.get("/sales", (req, res, next) => {
    let productArray = products.sort((a,b) => {
        if(a.discountPercentage < b.discountPercentage){
            return 1;
        } else if (a.discountPercentage > b.discountPercentage){
            return -1;
        } else {
            return 0;
        }
    });

    productArray = productArray.slice(0,3);

    res.status(200).json({
        success: true,
        data: productArray,
    })
})


//Devolver producto por id
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const product = products.filter(element => element.id === id);

    res.status(200).json({
        success: true,
        data: product,
    })
})


//Añadir nuevo producto (el id se carga automáticamente)
router.post("/", (req, res, next) => {
    const objProperties = Object.entries(req.body);

    objProperties.unshift(["id", products.length + 1]);

    const newProduct = Object.fromEntries(objProperties);

    products.push(newProduct);

    fs.writeFileSync("./db/products.json", JSON.stringify(products, null, 2));

    res.status(200).json({
        success: true,
        data: newProduct,
    })
})


//Modificar producto indicado por id
router.put("/:id", (req, res, next) => {
    let editedProd;

    //Función para editar solo las propiedades coincidentes (Descarto usar Object.assign() porque puede incluirme propiedades nuevas)
    const updateValues = (o1, o2) => {
        const keys = Object.keys(o1);
        const values = Object.values(o1);
      
        for(let i=0;i<keys.length;i++){
          if(Object.hasOwn(o2, keys[i])){
            o2[keys[i]] = values[i];
          }
        }

    }
      
    for(let i=0;i<products.length;i++){
        if(products[i].id === parseInt(req.params.id)){
            updateValues(req.body, products[i]);
            editedProd = products[i];
        }
    }

    fs.writeFileSync("./db/products.json", JSON.stringify(products, null, 2));

    res.status(200).json({
        success: true,
        data: editedProd,
    })
})


//Eliminar producto
router.delete("/:id", (req, res, next) => {
    for(let i=0;i<products.length;i++){
        if(parseInt(req.params.id) === products[i].id){
            products.splice(i,1);
        } 
    }

    fs.writeFileSync("./db/products.json", JSON.stringify(products, null, 2));

    res.status(200).json({
        success: true,
        data: "Product deleted successfully",
    })
})

module.exports = router