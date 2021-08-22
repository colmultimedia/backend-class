const express = require("express");

const port = 8000;
const app = express();


const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
})


app.set("views", "./views");
app.set("view engine", "pug");

        // app.use(express.static('public'));



    const productos = require("./rutas/productos.rutas");
    
    app.use('/api/productos', productos);


      