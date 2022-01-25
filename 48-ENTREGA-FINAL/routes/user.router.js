import express from "express"
import passport from "passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
import { msgs } from "../config/constants.js";




import { JWT_SECRET } from "../config/constants.js";
const router = express.Router()



passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      console.log({jwtPayload});
      done(null, jwtPayload)
      User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
      });
    }
  )
)

class UserRouter {

    start() {
        
      router.post('/login', (req, res) => {
        let user = User.find({username: req.body.username})
        if (!user) return res.status(400).json({ message: 'User not exist' })
        
        let success = user.password == req.body.password; 
        if (!success) return res.status(400).json({ message: 'Mail or Password was wrong' });
        
        user.count = 0;
        const token = jwt.sign(user, 'secret');
      
        return res.status(200).json({ user, token });
      })
      
      router.post('/signup', (req, res) => {
        const count = User.find({username: req.body.username}).length;
        if (count) return done(null,false)
      
        let user = req.body;
        
        try{
          async () => {
          const data = req.body
          const newUser = new User(data)
            res.json(await newUser.save())
          }
          }catch(err){
            console.error(msgs.error, err)
          }
          return res.status(200).json({ user });
        })
      
      router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json(req.user.profile)
      })
        return router
    }
}

export default UserRouter

  