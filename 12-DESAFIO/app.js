const express = require("express");
const port = 8000;
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);


    app.set('views','./views');
    app.set('view engine','ejs');
        app.use(express.static('public'));


    const productosRutas = require("./rutas/productos.rutas");
    
    app.use('/api/productos', productosRutas[0]);

    let productoss = productosRutas[1]
    io.on('connection', (socket) => {
        console.log('cliente conectado ' + socket.id),
        socket.emit('producto', productoss );
    });

http.listen(port, ()=> {
console.log('Inicializado...')
})