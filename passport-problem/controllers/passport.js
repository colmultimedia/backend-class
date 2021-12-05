const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt");
const User = require("../schemas/user.schema")
const { TwilioCom } = require("./twilio")
const waa = new TwilioCom()


passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email: email}, (err, user) => {
          if (err) {
             waa.enviarMsg("Ha iniciado sesión el usuario registrado con el correo " + email)
            return done(err);
          }
          if (!user) {
            console.log("User Not Found with E-mail " + email);
            console.log("message", "User Not found.");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.log("Invalid Password");
            console.log("message", "Invalid Password");
            return done(null, false);
          }
          waa.enviarMsg("Ha iniciado sesión el usuario registrado con el correo " + email)
          return done(null, user);
          
        });
      }
    )
  );
  
  const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
  };
  
         
              
  passport.use(
                "register",
                new LocalStrategy(
                  {
                    passReqToCallback: true,
                  },
        
                  (req, email, password, done) => {
                    const findOrCreateUser = () => {
                      
                      User.findOne({ email: email }, (err, user) => {
                        if (err) {
                          console.log("Error in SignUp: " + err);
                          return done(err);
                        }
                        if (user) {
                          console.log("User already exists");
                          console.log("message", "User Already Exists");
                          return done(null, false);
                        } else {
                          const newUser = new User();
                          newUser.email = email;
                          newUser.password = createHash(password);
                          newUser.address = req.body.address;
                          newUser.age = req.body.age;
                          newUser.prefix = req.body.prefix;
                          newUser.telephone = req.body.telephone;
                          console.log(newUser)
                          newUser.save((err) => {
                            if (err) {
                              console.log("Error in Saving user: " + err);
                              throw err;
                            }
                             waa.enviarMsg("Se ha registrado el email " + email)
                            console.log("User Registration succesful");
                            return done(null, newUser);
                          });
                        }
                      });
                    };
                    process.nextTick(findOrCreateUser);
                  }
                )
              );
              
              const createHash = (password) => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
              };
              
              passport.serializeUser((user, done) => {
                done(null, user._id);
              });
              
              passport.deserializeUser((id, done) => {
                User.findById(id, (err, user) => {
                  done(err, user);
                });
              });
              
              