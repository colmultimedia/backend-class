const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const port = 8080
const {Firebase} = require("./db")

var date = new Date()
var dateConverted = moment(date).format('lll');
var mensajes = [{
  email: "mattheuv.osorio@geometry.com",
  date: dateConverted,
  opinion: "holi"
}];

const anibal = new Firebase

anibal.connectDB()

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get('/vista', (req, res) => {

    res.render("index", mensajes);
})


io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    anibal.readMessage().then(data => {
    socket.emit("mensajes", data);
    })
    socket.on("new-mensaje", function(data){
        anibal.createMessage(data)
        anibal.readMessage().then(data => {
        io.sockets.emit("mensajes", data);
    });
});
});

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost" + port);
});

