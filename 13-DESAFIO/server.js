var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var moment = require("moment");
var productosRutas = require("./rutas/productos.rutas");
app.use('/api/productos', productosRutas[0]);
var productos = productosRutas[1];
var date = new Date();
var dateConverted = moment(date).format('lll');
var mensajes = [{
        email: "mattheuv.osorio@geometry.com",
        date: dateConverted,
        opinion: "holi"
    }];
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static("public"));
io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    socket.emit("messages", productos);
    socket.emit("mensajes", mensajes);
    socket.on("new-message", function (data) {
        var arrProductos = data;
        var length = productos.length + 1;
        arrProductos.id = length;
        productos.push(arrProductos);
        io.sockets.emit("messages", productos);
    });
    socket.on("new-mensaje", function (data) {
        mensajes.push(data);
        io.sockets.emit("mensajes", mensajes);
    });
});
server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});
