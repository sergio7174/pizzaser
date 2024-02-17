const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
  
  passport.use("local-register",new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      
      async (req, email, password, done) => {
        try {
  
          console.log("Estoy en passport.authenticate - passport.use - line 33, req.body: "+req.body);
         
  
          let { firstName, lastName, username } = req.body;
          if (!username || !email || !password || !firstName || !lastName) {
            return done(null, false, {
              missingCredentials: true,
              message: "All fields are required!",
            });
          }
  
          username = username.trim().toLowerCase();
          email = email.trim().toLowerCase();
          let { tempUser } = req;
          
          if (!tempUser) {
            let existingUser = await User.findOne({ email });
            if (existingUser) {
              return done(null, false, {
                emailAlreadyExists: true,
                message:
                  "An account already exists with this email, if you have already registered with this email, please sign in using it!",
              });
            } else { 
              
              console.log("EStoy en passport - line 52 - voy a guardar")
              // This function is reused throughout the controller to organize user attributes 
              // in one object. You should create the same functions for your other model controllers.
            
              const hashedPassword = await bcrypt.hash(password, 10);
              const local ="local";
              getUserParams = body => {
                return {
                  firstName: body.firstName,
                  lastName: body.lastName,
                  username: body.username,
                  email: body.email,
                  password: hashedPassword,
                  loginType: local,

                };
              };
                      
                       const data = new User(getUserParams(req.body));
  
                       data.save().then(() => 
                        
                        
                        {let err= null;
                        let user = true;
                        let message = "Account Register Success ... ";


                        return done( err,user,{message}
                        
                        )})

                  
                       console.log("Guarde con Exito - line 74")

                       }
  
            existingUser = null;
            existingUser = await User.findOne({ username });
            
            console.log("Estoy en la linea 119 - existingUser: "+existingUser);

            if (existingUser) {
              return done(null, true, {
                usernameAlreadyExists: true,
                message: "An account already exists with this username!",
              });
            }
            console.log("Estoy en passport.authenticate - passport.use - line 64, existingUser: "+existingUser);
  
            delete existingUser;
  
            req.tempUser = null;
            return done(null, user);
          } 
          
          
          else if (!tempUser.providers.includes("local")) {
            let existingUser = await User.findOne({ email });
            if (existingUser) {
              return done(null, false, {
                emailAlreadyExists: true,
                message:
                  "An account already exists with this email, if you have already registered with this email, please sign in using it!",
              });
            }
            existingUser = null;
            existingUser = await User.findOne({ username });
            if (existingUser) {
              return done(null, false, {
                usernameAlreadyExists: true,
                message: "An account already exists with this username!",
              });
            }
  
  
            delete existingUser;
            return done(null, false);
          } else {
            req.tempUser = null;
            return done(null, false, {
              alreadyRegistered: true,
              message: "You have already registered!",
            });
          }
  
          
  
          
  
  
  
  
  
        } catch (err) {
          return done(err.message, false);
        }
  
          
  
  
      }
      
    )
    
  );