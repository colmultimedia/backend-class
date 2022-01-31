import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../model/user.model.js'
import {addCart} from './cart.service.js'



passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    return done(null, id)
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        return done(null, false)
    }
    if (!user.comparePassword(password)) {
        return done(null, false)
    }
    done(null, user)
}))

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false)
    } else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        newUser.address = req.body.address;
        newUser.age = req.body.age;
        newUser.prefix = req.body.prefix;
        newUser.telephone = req.body.telephone;
        await newUser.save()
        done(null, newUser)
        addCart(email)
    }
}))