const router = require('express').Router()

// Your code goes here!
let users = [
  {
    id : 1,
    firstname: 'Riley',
    lastname: 'Williams',
    email: 'riley.williams@example.com',
    phone: '+1-202-555-0167',
    DateOfBirth: 6/08/1998,
    weight: 74,
    stature: 179,
    age: 24,
    bloodGroup: 'A',
    domain: 'example.com',
    ip: '127.12.134.105',
    city: 'Denver',
    state: 'Colorado',
    macAddress: '8D:C4:DC:2A:B9:20',
    university: 'University of Colorado Boulder',
    cardNumber: '**** **** **** 1234',
    cardType: 'Visa',
    currency: 'USD',
    iban: '**** **** **** **** **** **** **** 1234',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
  },
  
    {
      id : 2,
    firstname: 'Chloe',
    lastname: 'Davis',
    email: 'chloe.davis@example.com',
    phone: '+44-20-5555-8921',
    DateOfBirth: 5/04/1991,
    bloodGroup: 'B',
    weight: 63,
    stature: 165,
    age: 32,
    domain: 'example.com',
    ip: '176.12.24.15',
    city: 'London',
    state: 'England',
    macAddress: '2F:9B:3C:8A:D7:14',
    university: 'University of Oxford',
    cardNumber: '**** **** **** 9876',
    cardType: 'Mastercard',
    currency: 'GBP',
    iban: '**** **** **** **** **** **** **** 9876',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0'
  },
  
  {
    id : 3,
    firstname: 'Ivan',
    lastname: 'Petrov',
    email: 'ivan.petrov@example.com',
    phone: '+7-495-555-9912',
    DateOfBirth: 6/01/1982,
    bloodGroup: 0,
    weight: 76,
    stature: 181,
    age: 41,
    domain: 'example.com',
    ip: '89.114.177.205',
    city: 'Moscow',
    state: 'Russia',
    macAddress: '78:CD:6E:3B:2F:1C',
    university: 'Lomonosov Moscow State University',
    cardNumber: '**** **** **** 5678',
    cardType: 'Visa',
    currency: 'RUB',
    iban: '**** **** **** **** **** **** **** 5678',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0'
  },
  
    {
      id : 4,
    firstname: 'Maria',
    lastname: 'Garcia',
    email: 'maria.garcia@example.com',
    phone: '+34-91-555-3234',
    DateOfBirth: 9/10/1994,
    bloodGroup: 'A',
    weight: 48,
    stature: 169,
    age: 28,
    domain: 'example.com',
    ip: '82.22.43.129',
    city: 'Madrid',
    state: 'Spain',
    macAddress: 'F8:72:9D:6B:3A:5C',
    university: 'Universidad Complutense de Madrid',
    cardNumber: '**** **** **** 3456',
    cardType: 'Mastercard',
    currency
  }
]
router.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'listening'
        }
    })
})

router.get('/data', (req, res, next) => {

  const data = users.map(user => ({
    firstname: user.firstname,
    lastname: user.lastname,
    image: user.image
  }));

 

  res.json(data);
})

router.get('/card/type', (req, res, next) => {

  const filteredUsers = users.filter(user => user.cardType === type);

  const result = filteredUsers.map(user => {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      age: user.age,
      bank: {
        name: user.bank.name,
        account: (user.bank.account),
        iban: (user.bank.iban)
      },
    }
    });
  res.json(result);
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  const user = users.find(user => user.id === id);

  if (!user) {
     res.status(404).json({ error: 'User not found' });
  }

  const info = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    age,
    domain: user.domain,
    ip: user.ip,
    city: user.city,
    state: user.state,
    macAddress: user.macAddress,
    university: user.university,
    cardNumber: user.cardNumber,
    cardType: user.cardType,
    currency: user.currency,
    iban: user.iban,
    userAgent: user.userAgent
  };


  res.json(info);
})
router.get('/:id/details', (req, res, next) => {
  const user = users.find(user => user.id === id);

  res.json(user);
})








module.exports = router