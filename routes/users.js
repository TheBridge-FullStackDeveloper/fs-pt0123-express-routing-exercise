const router = require('express').Router()

// Your code goes here!

// I require the File System 
const fs = require('fs');
const { userInfo } = require('os');

// I storage the users into a const allUsers
const allUsers = JSON.parse( fs.readFileSync( './db/users.json' ) );

// Devuelve firstname, lastname e image de todos los usuarios: GET /users
router.get('/', (req, res, next) => {
    const usersArray = allUsers.map( (element, index, allUsers) =>{
        const user = {
            "First Name" : element.firstName,
            "Last Name"  : element.lastName,
            "Image"      : element.image,
        }
        return user;
    });
    res.status(200).json({
        success : true,
        data    : usersArray,
    });
});

// Dado un id, devuelve solo la siguiente información de ese usuario: GET /users/:id
router.get( '/:id', (req, res, next) =>{
    //Calculating age required
    const gettingAge = ( dateA, dateB ) => {
        let auxAge = 1000*60*60*24*365;
        return Math.floor( (dateA - dateB) / auxAge );
    }

    const informationUser = () => {

        for ( let i = 0; i < allUsers.length; i++ ) {

            const user = allUsers[i];
            if( user.id === parseInt( req.params.id )) {
                const information = {
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
        success : true,
        data    : informationUser,
    });

});

// Dado un id, devuelve toda la información de ese usuario sin limitaciones: GET /users/:id/details

router.get( '/:id/details', ( req, res, next ) =>{
    const informationUser = () => {
        for( let i = 0; i < allUsers.length; i++ ){
            if ( allUsers[i].id === parseInt( req.params.id ) ) {
                const user = allUsers[i];
                return user;
            };
        };
    };
    res.status( 200 ).json({
        success : true,
        data    : informationUser,
    });
});

// Dado el tipo de tarjeta, saca una lista de usuarios cuyo tipo de tarjeta sea la misma: GET /users/card/:type 
router.get('/users/card/:type', ( req, res, next ) =>{
    //Calculating age required
    const gettingAge = ( dateA, dateB ) => {
        let auxAge = 1000*60*60*24*365;
        return Math.floor( (dateA - dateB) / auxAge );
    }

    const informationUser = () => {
        
        const arrayUser = [];

        for( let i = 0; i < allUsers.length.length; i++ ){
            const user = allUsers[i];

            if( user.bank.cardType === req.params.type ){

                const information = {
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
                };
                arrayUser.push( information );
            };

        };
        return arrayUser;

    };

    res.status( 200 ).json({
        success : true,
        data    : informationUser, 
    });

});

// Saca firstname, lastname, image, age, weight y bloodGroup. Pero 
// solo aquellos que pesen más de 50kg y y su edad esté comprendida entre 18 y 60 (incluídos): 
// GET /users/donors
router.get( './users/donors', ( req, res, next ) =>{

    //Calculating age required
    const gettingAge = ( dateA, dateB ) => {
        let auxAge = 1000*60*60*24*365;
        return Math.floor( (dateA - dateB) / auxAge );
    }

    const information = () => {
        const infoArray = [];
        for ( let i = 0; i < allUsers.length ; i++ ){
            const user = allUsers[i];
            const age = gettingAge(new Date(), new Date( user.birthDate ));
            if( user.weight > 50 && age >= 18 && age <= 60 ){
                const info = {
                    "First Name": user.firstName,
                    "Last Name": user.lastName,
                    "Image": user.image,
                    "Weight": user.weight,
                    "Bloodgroup": user.bloodGroup,
                };
                infoArray.push( userInfo );
            };
        };
        return infoArray;
    };

    res.status(200).json({
        success: true,
        message: 'Here the data requested...'
    });

});

// Add a new User ( DO not forget the ID )
// POST /users
router.post( './users', ( res, req, next ) =>{

    const addUser = Object.entries(req.body);

    newRegister.unshift( ['id', allUsers.length + 1] );

    const newReg = Object.fromEntries( newRegister );

    allUsers.push( newRegister );

    fs.writeFileSync( './db/users.json', JSON.stringify( allUsers, null, 2 ) );

    res.status(200).json({
        success : true,
        message : 'User added successfully!',
        data    : newUser,
    })
});


// Given an ID, delete that user:
// DELETE /users/:id
router.delete( './users/:id', ( req, res, next ) =>{

    for( let index = 0; index < allUsers.length; index++ ){
        if( parseInt( req.params.id ) === allUsers[i].id ){
            allUsers.slice( i,1 );
        }
    }
    fs.writeFileSync( "./db/users.json", JSON.stringify(allUsers, null, 2) );

    res.status(200).json({
        success : true,
        message : 'User deleted.',
        data: "Great! User have been deleted, this can't be undone!",
    });

});


module.exports = router