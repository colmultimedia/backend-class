const express:any = require("express");
const app:any = express();
const server:any = require("http").Server(app);
const io:any = require("socket.io")(server);
const moment:any = require("moment")
const productosRutas:any = require("./rutas/productos.rutas");
    
app.use('/api/productos', productosRutas[0]);

let productos: any = productosRutas[1]
let date: any = new Date()
let dateConverted: any = moment(date).format('lll');
let mensajes: any = [{
  email: "mattheuv.osorio@geometry.com",
  date: dateConverted,
  opinion: "holi"
}];

app.set('views','./views');
app.set('view engine','ejs');


app.use(express.static("public"));


io.on("connection", function (socket:any) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", productos);
  socket.emit("mensajes", mensajes);

  socket.on("new-message", function (data:any) {
    let arrProductos:any = data
    let length:number = productos.length+1
    arrProductos.id = length
    productos.push(arrProductos);

    io.sockets.emit("messages", productos);
  });
  socket.on("new-mensaje", function(data:any){
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

