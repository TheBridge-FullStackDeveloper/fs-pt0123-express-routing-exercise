const router = require('express').Router()

// Your code goes here!

// Requerir el archivo users.json
const ArrayUsers = require("../db/users.json");
// Funcion para calcular la edad con la fecha de cumpleaños.
function functionAge (fecha) {
    const today = new Date();
    const birthday = new Date(fecha);
    const yearsDate = today.getFullYear() - birthday.getFullYear();
    const age = birthday.getMonth() - today.getMonth();

    return yearsDate;
};

// Ruta para acceder a los users y ver solo las propiedades marcadas. 
router.get("/", (req, res, next) => {
    console.log("Estos son los firstname, lastname  e image");
    const data = ArrayUsers.map(user => ({ Firstname: user.firstName, Lastname: user.lastName, Image: user.image }));
    res.status(200).json({
        success: true,
        data: {
            message: 'response from GET "/users/" endpoint',
            data: data
        }
    })
})

//Ruta para ver los tipos de tarjeta segun el tipo seleccionado por el "cliente"
router.get("/card/:type",(req,res,next)=>{
    console.log("usuarios con el mismo tipo de tarjeta");
    const type = req.params.type;
    const typeDetails = ArrayUsers.filter(obj => obj.bank.cardType === type);
    const typeDetailsfilter = typeDetails.map(obj => ({
        firstname: obj.firstName,
        lastname: obj.lastName,
        email: obj.email,
        phone: obj.phone,
        age: functionAge(new Date(obj.birthDate)),
        bank: obj.bank.cardNumber.replace(/\d(?=\d{4})/g, "*"),
        useragent: obj.userAgent,
    }))

    res.status(200).json({
        succes : true,
        data: {
            message: 'response from GET "/users/card/:type" endpoint',
            data: typeDetailsfilter
        }
        
    })
})

// Ruta para devolver datos segun condiciones de edad y peso.
router.get("/donors",(req,res,next)=>{
    console.log("Datos por edad y peso");
    const donors = req.params.donors;
    const ObjDonors = ArrayUsers.map(obj => ({
        firstname: obj.firstName,
        lastname: obj.lastName,
        email: obj.email,
        age: functionAge(new Date(obj.birthDate)),
        weight: obj.weight,
        bloodGroup: obj.bloodGroup
    })); 
    const donorsFilter = ObjDonors.filter((obj)=>{ return obj.weight > 50 && obj.age > 18 && obj.age < 60 });

    res.status(200).json({
        succes: true,
        data: {
            message: 'response from GET "/users/donors" endpoint',
            data: donorsFilter
        }
        
    })
})

// Ruta para devolver determinadas propiedades con cambios, segun un id solicitado por el "cliente". 
router.get("/:id", (req, res, next) => {
    console.log("esto es la info de id");
    const ArrayDataID = ArrayUsers.filter(obj => obj.id.toString() === req.params.id);
    const dataID = ArrayDataID.map(user => ({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        phone: user.phone,
        age : functionAge(new Date(user.birthDate)),
        // domain
        ip: user.ip,
        city: user.address.city,
        state: user.address.state,
        macAddress: user.macAddress,
        university: user.university,
        cardNumber: user.bank.cardNumber.replace(/\d(?=\d{4})/g, "*"),
        cardType: user.bank.cardType,
        currency: user.bank.currency,
        // iban (quítale los espacios y pon la misma máscara de asteriscos que para el número de tarjeta)
        userAgent: user.userAgent,
    }));
    res.status(200).json({
        success: true,
        data: {
            message: 'response from GET "/users/:id" endpoint',
            data: dataID
        }

    })

})
// Ruta para devolver todos los datos del users
router.get('/:id/details',(req,res,next)=>{
    console.log("Esto son los resultados al llamar id/details");
    const userID = req.params.id;
    const usersDetails = ArrayUsers.find(obj => obj.id.toString() === userID);

    res.status(200).json({
        success: true, 
        data: {
            message: 'response from GET "/users/:id/details" endpoint',
            data: usersDetails
        }
    })
})

// Ruta post para añadir un usuario nuevo
router.post('/users',(req, res, next)=> {
    console.log("Añadir un user");

    res.status(200).json({
        success: true, 
        data: {
            message: 'response from POST "/users" endpoint',
            data: req.body
        }

    })
})

router.put('/users/:id', (req,res,next)=>({
    success : true,
    data: {
        message: 'response from PUT "/users/:id" endpoint',
        data: req.body
    }
}))




module.exports = router