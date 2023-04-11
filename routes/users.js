const path = require('path');
const router = require('express').Router();
const fs = require('fs');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'users.json')));

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  const age = now.getFullYear() - birth.getFullYear();
  const monthDifference = now.getMonth() - birth.getMonth();
  const dayDifference = now.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    return age - 1;
  }

  return age;
}

function maskString(str, unmaskedLength = 4) {
  const maskedLength = str.length - unmaskedLength;
  return '*'.repeat(maskedLength) + str.substr(maskedLength);
}

router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const userInfo = {
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    phone: user.phone,
    age: calculateAge(user.birthDate),
    domain: user.domain,
    ip: user.ip,
    city: user.address.city,
    state: user.address.state,
    macAddress: user.macAddress,
    university: user.university,
    cardNumber: maskString(user.bank.cardNumber),
    cardType: user.bank.cardType,
    currency: user.bank.currency,
    iban: maskString(user.bank.iban.replace(/\s+/g, '')),
    userAgent: user.userAgent
  };

  res.json(userInfo);
});

// Dado un id, devuelve toda la información de ese usuario sin limitaciones: GET /users/:id/details
router.get('/users/:id/details', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});
//De cada usuario debes devolver lo siguiente: 1. firstname 2. lastname 3. email 4. phone 5. age 6. bank (pero la información sensible debe ser enmascarada, como ya se hizo antes) 7. userAgent
router.get('/users/card/:type', (req, res) => {
    const cardType = req.params.type;
    const filteredUsers = users.filter(user => user.bank.cardType === cardType);
  
    if (filteredUsers.length > 0) {
      const result = filteredUsers.map(user => {
        return {
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          phone: user.phone,
          age: calculateAge(user.birthDate),
          bank: {
            ...user.bank,
            cardNumber: maskString(user.bank.cardNumber),
            iban: maskString(user.bank.iban.replace(/\s+/g, ''))
          },
          userAgent: user.userAgent
        };
      });
  
      res.json(result);
    } else {
      res.status(404).send({ error: 'No users found with the specified card type' });
    }
  });
  

module.exports = router;
