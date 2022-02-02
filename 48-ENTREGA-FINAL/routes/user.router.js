import express from "express"
import passport from "passport";
import User from '../model/user.model.js'
import { msgs } from "../config/constants.js";



const router = express.Router()




class UserRouter {

    start() {


router.get('/signup', (req, res, next) => {
  res.render('signup', {
      title: 'Sign Up',
  })
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

router.get('/login', (req, res, next) => {
  res.render('signin', {
      title: 'Login',
  })

  // transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //         console.log(err)
  //         return err
  //     }
  //     console.log(info)
  // })
})

  router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true,
  }))

  router.get('/usertest', isAuthenticated, (req, res) => {
    res.send("is active")
  })
       
        return router
    }
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next()
  }
  res.redirect('/signin')
}


export default UserRouter

  