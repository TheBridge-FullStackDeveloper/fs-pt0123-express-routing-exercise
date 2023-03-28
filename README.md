# Antes de empezar!
- npm i
- npm run dev

## Para productos
- Devuelve todos los productos: *GET /products*
- Dado un id, devuelve solo ese producto: *GET /products/:id*
- Devuelve todos los productos que tengan un stock inferior o igual que el indicado por query string: *GET /products/stock?max=50*
- Devuelve todos los productos que sean de una categoría determinada: *GET /products/category?name=fragrances*
- Saca los 3 productos con el mayor descuento (discountPercentage más alto): *GET /products/sales*
- Añade un producto nuevo (no olvides su id): *POST /products*
- Dado un id, modifica ese producto con la información recibida en el body. MODIFICA SOLO LOS CAMPOS
     RECIBIDOS SI EL PRODUCTO A MODIFICAR TAMBIÉN LOS TIENE: *PUT /products/:id*
- Dado un id, elimina ese producto: *DELETE /products/:id*


## Para usuarios
- Devuelve firstname, lastname e image de todos los usuarios: *GET /users*
- Dado un id, devuelve solo la siguiente información de ese usuario: *GET /users/:id*
     1.firstname
     2.lastname
     3.email
     4.phone
     5.age (calcúlalo a partir de su fecha de cumpleaños)
     6.domain
     7.ip
     8.city
     9.state
     10.macAddress
     11.university
     12.cardNumber (ponle una máscara de asteriscos a todos los números, salvo a los 4 últimos)
     13.cardType
     14.currency
     15.iban (quítale los espacios y pon la misma máscara de asteriscos que para el número de tarjeta)
     16.userAgent
- Dado un id, devuelve toda la información de ese usuario sin limitaciones: *GET /users/:id/details*
- Dado el tipo de tarjeta, saca una lista de usuarios cuyo tipo de tarjeta sea la misma: *GET /users/card/:type*
     De cada usuario debes devolver lo siguiente:
         1.firstname
         2.lastname
         3.email
         4.phone
         5.age
         6.bank (pero la información sensible debe ser enmascarada, como ya se hizo antes)
         7.userAgent
- Saca firstname, lastname, image, age, weight y bloodGroup. Pero solo aquellos que pesen más de 50 y
     y su edad esté comprendida entre 18 y 60 (incluídos): *GET /users/donors*
- Añade un usuario nuevo (no olvides su id): *POST /users*
- Dado un id, modifica ese usuario con la información recibida en el body. MODIFICA SOLO LOS CAMPOS
     RECIBIDOS SI EL USUARIO A MODIFICAR TAMBIÉN LOS TIENE: *PUT /users/:id*
- Dado un id, elimina ese usuario: DELETE */users/:id*
