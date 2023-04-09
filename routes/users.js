const router = require("express").Router();
const fs = require("fs");
const users = require("../db/users.json");

// Your code goes here!

fs.readFile("./db/products.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

router.get("/", (req, res, next) => {
  const simplified = users.map((user) => ({
    firstname: user.firstName,
    lastname: user.lastName,
    image: user.image,
  }));
  if (simplified) {
    res.send(simplified);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  const userSimplified = {
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.birthDate, //¡¡¡¡¡Corregir!!!!!
    domain: user.domain,
    ip: user.ip,
    city: user.address.city,
    state: user.address.state,
    macAddress: user.macAddress,
    university: user.university,
    cardNumber: user.bank.cardNumber, //¡¡¡¡¡¡¡¡¡¡¡¡¡Poner los asteristcos a todos menos a los 4 últimos!!!!!!!!!!!!
    cardType: user.bank.cardType,
    currency: user.bank.currency,
    iban: user.bank.iban, //Quitarle los espacios
    userAgent: user.userAgent,
  };
  if (userSimplified) {
    res.send(userSimplified);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/details", (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

module.exports = router;
