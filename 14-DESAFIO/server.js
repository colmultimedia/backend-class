import { productos, router } from './routes/productos.route.js'
import { carritos, routerCarritos } from './routes/carrito.route.js'

import express from "express"
const port = 8080
const app = express()
export const administrador = true

const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
})
    
app.use('/api/productos', router);
app.use('/api/carritos', routerCarritos);


app.set('views','./views');
app.set('view engine','ejs');


app.use(express.static("public"));




