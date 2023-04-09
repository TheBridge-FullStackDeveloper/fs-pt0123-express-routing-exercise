const router = require('express').Router()

// Your code goes here!
const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./db/users.json'));


//Devuelve firstname, lastname e image de todos los usuarios
router.get('/', (req, res, next) => {
    const usersInfo = users.map((user) => ({
      firstname: user.firstName,
      lastname: user.lastName,
      image: user.image,
    }));
  
    res.status(200).json({
      success: true,
      data: usersInfo,
    });
  });


  //creo la funcion fuera para poder reutilizar despues para Donors,:id y Card/:type
  const calcularEdad = (fechaNacimiento) => {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const añoNacimiento = fechaNacimiento.getFullYear();
    const edad = añoActual - añoNacimiento;
    return edad;
  }

  //Saca firstname, lastname, image, age, weight y bloodGroup. 

  router.get('/donors', (req, res, next) => {
    
    const getInfo = () => {
      const arr = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const edad = calcularEdad(new Date(user.birthDate));
        if (user.weight > 50 && edad > 18 && edad < 60) {
          const userInfo = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "image": user.image,
            "weight": user.weight,
            "bloodGroup": user.bloodGroup,
          };
          arr.push(userInfo);
        }
      }
      return arr;
    };
  
    res.status(200).json({
      success: true,
      data: getInfo(),
    });
  });


 


  router.get('/:id', (req, res, next) => {
    const usersFilterId = users.filter(user => user.id === parseInt(req.params.id));
  
    const user = usersFilterId[0];
    const userInfo = {
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'phone': user.phone,
      'age': calcularEdad(new Date(user.birthDate)),
      'domain': user.domain,
      'ip': user.ip,
      'city': user.address.city,
      'state': user.address.state,
      'macAddress': user.macAddress,
      'university': user.university,
      'cardNumber': `**** **** ****  ${user.bank.cardNumber.slice(-4)}`,
      'cardType': user.bank.cardType,
      'currency': user.bank.currency,
      'iban': `**** **** **** **** ${user.bank.iban.replace(/ /g, '').slice(-4)}`,
      'userAgent': user.userAgent,
    };
  
    res.status(200).json({
      success: true,
      data: userInfo,
    });
  });


  router.get("/:id/details",(req,res,next) => {
    const infoUsers = () => {
        for(let i= 0 ;i < users.length ; i++) {
            if(users[i].id === parseInt(req.params.id)){
                const usuario = users[i];
                return usuario;
            }
        }
    }
    
    res.status(200).json({
        success: true,
        data: infoUsers(),
    });
});


router.get("/card/:type", (req, res, next) => {
  const userArr = users
    .filter(user => user.bank.cardType === req.params.type)
    .map(user => ({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      "Email": user.email,
      "Phone": user.phone,
      "Age": calcularEdad(new Date(user.birthDate)),
      "Card Expire": user.bank.cardExpire,
      "Card Number":  `**** **** ****  ${user.bank.cardNumber.slice(-4)}`,
      "Card Type": user.bank.cardType,
      "Currency": user.bank.currency,
      "IBAN": `**** **** **** **** ${user.bank.iban.replace(/ /g, '').slice(-4)}`,
      "User Agent": user.userAgent,
    }));
    
  res.status(200).json({
    success: true,
    data: userArr,
  });
});

router.post('/', (req, res, next) => {
    
  const arrUsers = Object.entries(req.body);
  arrUsers.unshift(['id', users.length +1]);
  const newUsers = Object.fromEntries(arrUsers);

  users.push(newUsers);

  fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2));
  console.log(users.length);

  res.status(200).json({ 
      success: true,
       data: newUsers,
       });
});

router.put('/:id',(req, res, next)=>{
  let newUsers;
  const actualizaValues = (obj1, obj2)=>{
    const newKeys = Object.keys(obj1);
    const newValue = Object.values(obj1);

    for (let i = 0; i < newKeys.length; i++) {
       if (newKeys[i] in obj2){
        obj2[newKeys[i]] = newValue[i];
       }
      
    }
  }
  for (let i = 0; i < users.length; i++) {
    if(users[i].id === parseInt(req.params.id)){
      actualizaValues(req.body, users[i]);
      newUsers = users[i];
    }
    
  }
  fs.writeFileSync('./db/users.json',JSON.stringify(users, null, 2));
  res.status(200).json({
    success: true,
    message: 'Modify users properties',
    data: newUsers,
  });
});

router.delete('/:id', (req, res, next)=>{
  for (let i = 0; i < users.length; i++) {
    if(parseInt(req.params.id) === users[i].id){
      users.splice(i,1);
    } 
  }
  fs.writeFileSync('./db/users.json',JSON.stringify(users, null, 2));
  res.status(200).json({
    success: true,
    message: 'remove users from file',
  });
});



module.exports = router