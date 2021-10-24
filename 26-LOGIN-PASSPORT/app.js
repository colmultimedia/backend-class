// DEPENDENCIES REAL TIME
const express = require("express");
const app = express();
const server = require("http").Server(app);
const moment = require('moment')
const port = 8080
const {router} = require("./routes/router")

// DEPENDENCIES DB
const mongoStore = require("connect-mongo")

// DEPENDENCIES SESSION
const session = require("express-session")
const cookieParser = require("cookie-parser")

// DEPENDENCIES PASSPORT
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


// SETTING COOKIES AND ADVANCE OPTIONS
app.use(cookieParser());
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}


app.use(router)

app.use(session({
  store: mongoStore.create({
    mongoUrl: "mongodb+srv://coladmin:mosorio12@cluster0.kduye.mongodb.net/desafio26?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
  secret: "djjfj",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}
))

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize())
app.use(passport.session())


app.use(express.static("public"));


passport.use(new LocalStrategy({passReqToCallback: true, },function(req, user, password, done){
  
  console.log(user)

  if(user =="mateo" && password == "123"){
    return done(null, {user: "mateo", id: 1})
  } else {
    return done(null, false)
  }
}))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, {id: 1, name: "aparicio"})
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.post('/login', passport.authenticate("local",{
  successRedirect: "/vista", 
  failureRedirect: "/password-invalid"
}))



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

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:" + port);
});


