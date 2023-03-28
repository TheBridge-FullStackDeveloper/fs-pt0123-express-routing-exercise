# Antes de empezar!
```js
npm i
```
```js
npm run dev
```

## Para productos
- Devuelve todos los productos: <b>GET /products</b>
- Dado un id, devuelve solo ese producto: <b>GET /products/:id</b>
- Devuelve todos los productos que tengan un stock inferior o igual que el indicado por query string: <b>GET /products/stock?max=50</b>
- Devuelve todos los productos que sean de una categoría determinada: <b>GET /products/category?name=fragrances</b>
- Saca los 3 productos con el mayor descuento (discountPercentage más alto): <b>GET /products/sales</b>
- Añade un producto nuevo (no olvides su id): <b>POST /products</b>
- Dado un id, modifica ese producto con la información recibida en el body.
     <br>MODIFICA SOLO LOS CAMPOS RECIBIDOS SI EL PRODUCTO A MODIFICAR TAMBIÉN LOS TIENE: <b>PUT /products/:id</b>
- Dado un id, elimina ese producto: <b>DELETE /products/:id</b>


## Para usuarios
- Devuelve *firstname*, *lastname* e *image* de todos los usuarios: <b>GET /users</b>
- Dado un id, devuelve solo la siguiente información de ese usuario: <b>GET /users/:id</b>
     1. *firstname*
     2. *lastname*
     3. *email*
     4. *phone*
     5. *age* (calcúlalo a partir de su fecha de cumpleaños)
     6. *domain*
     7. *ip*
     8. *city*
     9. *state*
     10. *macAddress*
     11. *university*
     12. *cardNumber* (ponle una máscara de asteriscos a todos los números, salvo a los 4 últimos)
     13. *cardType*
     14. *currency*
     15. *iban* (quítale los espacios y pon la misma máscara de asteriscos que para el número de tarjeta)
     16. *userAgent*
- Dado un id, devuelve toda la información de ese usuario sin limitaciones: <b>GET /users/:id/details</b>
- Dado el tipo de tarjeta, saca una lista de usuarios cuyo tipo de tarjeta sea la misma: <b>GET /users/card/:type</b>
     De cada usuario debes devolver lo siguiente:
         1. *firstname*
         2. *lastname*
         3. *email*
         4. *phone*
         5. *age*
         6. *bank* (pero la información sensible debe ser enmascarada, como ya se hizo antes)
         7. *userAgent*
- Saca *firstname*, *lastname*, *image*, *age*, *weight* y *bloodGroup*. Pero solo aquellos que pesen más de 50kg y
     y su edad esté comprendida entre 18 y 60 (incluídos): <b>GET /users/donors</b>
- Añade un usuario nuevo (no olvides su id): <b>POST /users</b>
- Dado un id, modifica ese usuario con la información recibida en el body.
<br>MODIFICA SOLO LOS CAMPOS RECIBIDOS SI EL USUARIO A MODIFICAR TAMBIÉN LOS TIENE: <b>PUT /users/:id</b>
- Dado un id, elimina ese usuario: <b>DELETE /users/:id</b>
