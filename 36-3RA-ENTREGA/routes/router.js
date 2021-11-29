const express = require("express")
const router = express.Router()
const carritoRouter = require("./carrito.router")
const productRouter = require("./productos.router")
const passport = require("passport")
// const { transporter, mailOptions, mailOptionsLogOut } = require("../nodemailer")

router.use("/carrito", carritoRouter)
router.use("/productos", productRouter)

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const {Mongo} = require("../db/db")

// ASSIGN CLASS MONGO WITH PROPERTIES TO USE BELOW
const db = new Mongo




router.get("/", (req, res) => {
  
    res.render("login")

    // transporter.sendMail(mailOptions, (err, info)=> {
    //   if(err) {
    //       console.log(err)
    //       return err
    //   }
    //   console.log(info)
    // })
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


  
  router.get("/faillogin", (req,res) => {
    res.render("logininvalid")
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
  

  

module.exports = {router}