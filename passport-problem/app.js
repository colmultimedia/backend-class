require('dotenv').config()
const express = require("express");
const app = express();
const server = require("http").Server(app);
const moment = require('moment')
const port = process.env.SERVER_PORT || 8080
const passport = require("passport")
const {router} = require("./routes/router")
const { Mongo } = require("./db/db")

 const runDB = new Mongo
 runDB.connectDB()

const email = "dimematthe@gmail.com"

class Server {
  constructor() {
    this.passportP();
  }
  passportP() {
    require("./controllers/passport");
    console.log("lady")
  }
  start(){
    server.listen(port, function () {
      console.log("Servidor corriendo en http://localhost:" + port);
    });
  }
}



app.use("/", router)


// DEPENDENCIES DB FOR SESSION
const mongoStore = require("connect-mongo")

// DEPENDENCIES SESSION
const session = require("express-session")
const cookieParser = require("cookie-parser")



app.set('views','./views');
app.set('view engine','ejs');

app.use(cookieParser());
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.use(session({
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: advancedOptions
  }),
  secret: "djjfj",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 6000000}
}
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(passport.initialize())
app.use(passport.session())
  


// Wrong routes msgs

const wrongMsg = {"error":"ruta equivocada"}
app.get("**",(req,res)=>{
    res.status(200).json(wrongMsg)
})
app.post("**",(req,res)=>{
    res.status(200).json(wrongMsg)
})
app.delete("**",(req,res)=>{
    res.status(200).json(wrongMsg)
})


// DEPENDENCIES REAL TIME
const io = require("socket.io")(server);

// io.on("connection", function (socket) {
  //     console.log("Alguien se ha conectado con Sockets");
//     db.readMessage().then(data => {
//     socket.emit("mensajes", data);
//     })
//     socket.on("new-mensaje", function(data){
    
//         db.createMessage(data)
//         db.readMessage().then(data => {
//           console.log(data)
//         io.sockets.emit("mensajes", data);
//     });
// });
// });

const run = new Server();

run.start();





