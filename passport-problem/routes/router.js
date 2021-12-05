require('dotenv').config()
const express = require("express")
const router = express.Router()
const carritoRouter = require("./carrito.router")
const productRouter = require("./productos.router")
const gqlRouter = require("./gql.router")
const passport = require("passport")
const multer = require("multer")

// settings multer 
var upload = multer();

let storage = multer.diskStorage ({
  destination: function (req, file, cb){
    cb(null, path.join(__dirname, '/public/uploads/'));
  },
  filename:function(req, file, callback){
      callback(null, file.originalname)
  }
})
let uploadFile = multer({storage})

// end settings multer


function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/");
  }
}

// const { transporter, mailOptions, mailOptionsLogOut } = require("../nodemailer")

router.use("/carrito", carritoRouter)
router.use("/productos", productRouter)
router.use("/graphql", gqlRouter)


router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const {Mongo} = require("../db/db")

// ASSIGN CLASS MONGO WITH PROPERTIES TO USE BELOW
const db = new Mongo

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    let { username } = req.body;
    req.session.username = username;
    res.redirect("/vista");
  }
);




router.get("/", (req, res) => {
  res.render("login")

})


  router.get("/faillogin", (req,res) => {
    res.render("logininvalid")
  })

  router.get("/logout", (req, res) => {
    
    res.json({msg: "cerrando sesión"})
    // transporter.sendMail(mailOptionsLogOut, (err, info)=> {
    //   if(err) {
    //       console.log(err)
    //       return err
    //   }
    //   console.log(info)
    // })
  })

  router.get("/register", (req, res) => {
  
    res.render("signup")
  })

  router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/failregister" }),
    (req, res) => {
      res.redirect("/");
    }
  );


  
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

  

  router.get('/vista', checkAuthentication, (req, res) => {
    const {username} = req.session
    res.render("vista", {username})
  })

  router.post("/subirAvatar", uploadFile.single("archivo"), (req, res) => {
    
    subirAvatar(req, res)
})

  

  

module.exports = {router}