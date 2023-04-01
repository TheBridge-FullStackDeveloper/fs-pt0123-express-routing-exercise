const router = require('express').Router()

// Your code goes here!

const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./db/users.json"));

//Devolver todos los usuarios
router.get("/",(req,res,next) => {
    const usersArr = users.map((element,index,users) => {
        const user = {
            "First Name": element.firstName,
            "Last Name": element.lastName,
            "Image": element.image,
        }

        return user;
    });

    res.status(200).json({
        success: true,
        data: usersArr,
    })
})


//Devolver usuarios de más de 50kg y entre 18 y 60 años
router.get("/donors",(req,res,next) => {
    //Función para calcular la edad
    const calculateAge = (date1, date2) => {
        return Math.floor((date1 - date2) / (1000*60*60*24*365));
    }

    const getInfo = () => {
        const userArr = [];
        for(let i=0;i<users.length;i++){
            const user = users[i];
            const age = calculateAge(new Date(), new Date(user.birthDate));
            if(user.weight > 50 && age > 18 && age < 60){
                const userInfo = {
                    "First Name": user.firstName,
                    "Last Name": user.lastName,
                    "Image": user.image,
                    "Weight": user.weight,
                    "Bloodgroup": user.bloodGroup,
                }

                userArr.push(userInfo);
            }
        }

        return userArr;
    }
    
    res.status(200).json({
        success: true,
        data: getInfo(),
    })
})


//Devolver información de un usuario por id
router.get("/:id",(req,res,next) => {
    //Función para calcular la edad
    const calculateAge = (date1, date2) => {
        return Math.floor((date1 - date2) / (1000*60*60*24*365));
    }

    const getInfo = () => {
        for(let i=0;i<users.length;i++){
            const user = users[i];
            if(user.id === parseInt(req.params.id)){
                const userInfo = {
                    "First Name": user.firstName,
                    "Last Name": user.lastName,
                    "Email": user.email,
                    "Phone": user.phone,
                    "Age": calculateAge(new Date(), new Date(user.birthDate)),
                    "Domain": user.domain,
                    "IP": user.ip,
                    "City": user.address.city,
                    "State": user.address.state,
                    "Mac Address": user.macAddress,
                    "University": user.university,
                    "Card Number": user.bank.cardNumber.slice(-4).padStart(user.bank.cardNumber.length,"*"),
                    "Card Type": user.bank.cardType,
                    "Currency": user.bank.currency,
                    "IBAN": user.bank.iban.split(" ").join("").slice(-4).padStart(user.bank.iban.length,"*"),
                    "User Agent": user.userAgent,
                }

                return userInfo;
            }
        }
    }
    
    res.status(200).json({
        success: true,
        data: getInfo(),
    })
})


//Devolver información detallada del usuario por id
router.get("/:id/details",(req,res,next) => {
    const getInfo = () => {
        for(let i=0;i<users.length;i++){
            if(users[i].id === parseInt(req.params.id)){
                const user = users[i];
                return user;
            }
        }
    }
    
    res.status(200).json({
        success: true,
        data: getInfo(),
    })
})


//Devolver usuarios por tipo de tarjeta
router.get("/card/:type",(req,res,next) => {
    //Función para calcular la edad
    const calculateAge = (date1, date2) => {
        return Math.floor((date1 - date2) / (1000*60*60*24*365));
    }

    const getInfo = () => {
        const userArr = [];
        for(let i=0;i<users.length;i++){
            const user = users[i];
            if(user.bank.cardType === req.params.type){
                const userInfo = {
                    "First Name": user.firstName,
                    "Last Name": user.lastName,
                    "Email": user.email,
                    "Phone": user.phone,
                    "Age": calculateAge(new Date(), new Date(user.birthDate)),
                    "Card Expire": user.bank.cardExpire,
                    "Card Number": user.bank.cardNumber.slice(-4).padStart(user.bank.cardNumber.length,"*"),
                    "Card Type": user.bank.cardType,
                    "Currency": user.bank.currency,
                    "IBAN": user.bank.iban.split(" ").join("").slice(-4).padStart(user.bank.iban.length,"*"),
                    "User Agent": user.userAgent,
                }
                
                userArr.push(userInfo);
            }
        }

        return userArr;
    }
    
    res.status(200).json({
        success: true,
        data: getInfo(),
    })
})


//Añadir un usuario nuevo (el id se carga automáticamente)
router.post("/", (req, res, next) => {
    const objProperties = Object.entries(req.body);

    objProperties.unshift(["id", users.length + 1]);

    const newUser = Object.fromEntries(objProperties);

    users.push(newUser);

    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

    res.status(200).json({
        success: true,
        data: newUser,
    })
})

//Modificar usuario indicado por id
router.put("/:id", (req, res, next) => {
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
    
    let editedUser;

    
    for(let i=0;i<users.length;i++){
        if(users[i].id === parseInt(req.params.id)){
            updateValues(req.body, users[i]);
            editedUser = users[i]
        }
    }
    

    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

    res.status(200).json({
        success: true,
        data: editedUser
    })
})


//Eliminar usuario
router.delete("/:id", (req, res, next) => {
    for(let i=0;i<users.length;i++){
        if(parseInt(req.params.id) === users[i].id){
            users.splice(i,1);
        } 
    }

    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

    res.status(200).json({
        success: true,
        data: "User deleted successfully",
    })
})


module.exports = router