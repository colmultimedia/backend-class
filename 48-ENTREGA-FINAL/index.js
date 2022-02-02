import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from "body-parser";
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import * as auth from "./service/auth.service.js"
import morgan from "morgan";
import { PORT } from "./config/constants.js"
import { router } from "./routes/router.js"
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io";
import moment from "moment";

const app = express()


// Reading body inputs for post
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//alerts for apis
app.use(morgan('dev'))

app.use(cors());
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static("public"));

// session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000
    },
    rolling: true
}))

app.use(bodyParser.json())
// passport

auth
app.use(passport.initialize())
app.use(passport.session())

// Including 1st Layer => Router

app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})

app.use(router)
// Launch server


// Socket
var date = new Date()
var dateConverted = moment(date).format('lll');
// var mensajes = [{
//   email: "mattheuv.osorio@geometry.com",
//   date: dateConverted,
//   opinion: "holi"
// }];

import { saveMessage, readMessage } from "./service/message.service.js";

// saveMessage({email: "perez@gmail.com", opinion: "no body here"})



const httpServer = createServer(app)
const io = new Server(httpServer, {

})
        io.on("connection", function (socket) {
          console.log("Alguien se ha conectado con Sockets");
          async () => {
              socket.emit("mensajes", await readMessage());
          }
          
          socket.on("new-mensaje", function(data){
            saveMessage(data)
            async () => {
                socket.emit("mensajes", await readMessage());
                io.sockets.emit("mensajes",await readMessage());
            }
          });
        });


httpServer.listen(process.env.SOCKET_PORT, function(){
    console.log(`You're running socket server on http://localhost:${process.env.SOCKET_PORT}`)
})


// const server = app.listen(PORT, function () {
//     console.log(`You're running the server on http://localhost:${server.address().port}`)
// })
