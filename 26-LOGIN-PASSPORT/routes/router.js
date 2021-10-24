const express = require("express")
const router = express.Router()
const carritoRouter = require("./carrito.router")
const productRouter = require("./productos.router")



//--------------------------------PASSPORT--------------------------------------

// const passport = require("passport")
// const { initializePassport } = require("../auth/passport")

// initializePassport(passport)



// passport.serializeUser(function(user, done) {
//   done(null, user.id)
// })

// passport.deserializeUser(function(id, done) {
//   done(null, {id: 1, name: "aparicio"})
// })
//--------------------------------END PASSPORT--------------------------------------



router.use("/carrito", carritoRouter)
router.use("/productos", productRouter)

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const {Mongo} = require("../db/db")

// ASSIGN CLASS MONGO WITH PROPERTIES TO USE BELOW
const db = new Mongo


//FIRST STARTS CONNECTING TO DB
db.connectDB()


router.get("/", (req, res) => {
  
    res.render("login")
  })

  router.get("/signup", (req,res) => {
    res.render("signup")
  })

  router.post("/signup", (req,res) =>{
    db.createUser(req, res)
  })
  
  router.get("/password-invalid", (req,res) => {
    res.render("logininvalid")
  })

    

router.get('/vista', (req, res, next) => {
  if(req.isAuthenticated()) return next()
}, (req, res) => {
    res.redirect("/login")
  })

  
  router.get("/misesion", (req, res) => {
    const { nombre } = req.query
    if(req.session.count){
      req.session.count++
      res.send(`${nombre} ha visitado el site ${req.session.count}`)
    }
    else{
      req.session.count = 1
      res.send("welcome papis")
    }
  })
  

  
  
  router.get("/logout", (req, res, next) => {
    
    req.session.destroy((err) => {
      if(err) return next(err)
      else
      res.status(200).render("logout")
    })
  })

module.exports = {router}