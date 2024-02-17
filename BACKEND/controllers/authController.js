const passport = require("passport");

//const LocalStrategy = require("passport-local").Strategy;


const bcrypt = require("bcrypt");
const fs = require("fs-extra");
const { cloudinary } = require("../utils/cloudinary");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Address = require("../models/addressModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/generateTokens");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
let getUserParams = body => {
              return {
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username,
                email: body.email,
                password: hashedPassword,
              };
            };



module.exports = {

    localRegister: async (req, res) => {

        console.log("Entre a authController - line 45 - local Register");

      
          //passport.authenticate("local-register", (err, user, info) => {  
    
          // begining testing block

            
          
                  console.log("Estoy en passport.authenticate - passport.use - line 63, req.body: "+req.body);
                 
          
                  let { firstName, lastName, username,email, password } = req.body;

                  if (!username || !email || !password || !firstName || !lastName) {
                    const message = "All fields are required!";
                    return res.status(404).json({ message });

                  } //last if 

                  /*** second check block */
           
                  existingUser = null;
                  existingUser = await User.findOne({ username });
                  
                  console.log("Estoy en la linea 85 - existingUser: "+existingUser);
      
                  if (existingUser) {
                  
              const message = "An account already exists with this username!";
              return res.status(303).json({ message });


                  }
                  console.log("Estoy en passport.authenticate - passport.use - line 93, existingUser: "+existingUser);
        
                  delete existingUser

          //************************       another block  *****************************//       
                  username = username.trim().toLowerCase();
                  email = email.trim().toLowerCase();
                  let { tempUser } = req;
                  
                  console.log("Estoy en authController - line 84 - tempUser: "+ tempUser);

                  if (!tempUser) {
                    let existingUser = await User.findOne({ email });
                    if (existingUser) {

                      /*return done(null, false, {
                        emailAlreadyExists: true,
                        message:
                          "An account already exists with this email, if you have already registered with this email, please sign in using it!",
                      });*/
                      const message = "An account already exists with this email, if you have already registered with this email, please sign in using it!";
                      return res.status(303).json({ message });
                    } else { 
                      
                      console.log("EStoy en passport - line 52 - voy a guardar")
                      // This function is reused throughout the controller to organize user attributes 
                      // in one object. You should create the same functions for your other model controllers.
                    
                      // hash para encriptar el poassword antes de guardarlo
                     // const hashedPassword = await bcrypt.hash(password, 10);
                      
                      // data from body -> comes from frontend react
                      const local ="local";
                      getUserParams = body => {
                        return {
                          firstName: body.firstName,
                          lastName: body.lastName,
                          username: body.username,
                          email: body.email,
                          //password: hashedPassword,
                          password: body.password,
                          loginType: local,};};
                
                // data instance of User          
                const data = new User(getUserParams(req.body));

                    // save data info mongodb through mongoose
          
      data.save().then(() => {const message = "User created successfully.!";
                               
         // return message to frontend with json.object , and status(201) ..it means save ok - see jason status list                    
                             
        return res.status(201).json( {message} ); })
        
                             
              }(req, res); } }, //try 0

      // locallogin action

      localLogin: async (req, res) => {
    
        console.log("Entrando en locallogin - line 138 -req.body:"+req.body.email);
        console.log("Entrando en locallogin - line 139 -req.body:"+req.body.password);


       /* try {*/
  //***************************** passport block begining **************************/
  let { email , password } = req.body
  
  // verify "All fields are required!"
  email = email.trim().toLowerCase();
  if (!email || !password) {

    let err = "All fields are required!";
    return res.status(500).json({ message: err });}

// verify account exist

    let existingUser = await User.findOne({ email });

    console.log("En locallogin - line 160 - existingUser:"+existingUser);
 
    if (!existingUser) {
   
      let message = "No account exists with this email!";
      return res.status(404).json({ message });
      ;}


/****** verify if exist user and passwords match ********** */

let user = existingUser;

if (existingUser) {


   existingUser.passwordComparison(req.body.password)
   
   .then(passwordsMatch=>{
    
    if(passwordsMatch){

              console.log("line - 190 - passwords are ok ******")
              return res.status(200).json({
                //token: accessToken,
                user,
                message: "User Logged-In successfully!",
              });} 
              
              else {let message = "Incorrect password!";
              return res.status(401).json({ message }); }
  
  })} // end if if (existingUser) block

}}    
  




    /*let { cartId } = req?.cookies;
    let userCart = await Cart.findOne({
      user: existingUser?._id,
      status: "not purchased",
    });
    if (cartId) {
      if (!userCart) {
        const cart = await Cart.findById(cartId);
        if (cart) {
          cart.user = existingUser?._id;
          cart.isGuestCart = false;
          await cart.save();
        }
      } else {
        const cart = await Cart.findById(cartId);
        if (cart) {
          let result = userCart;
          cart?.cartItems?.forEach((secondObj) => {
            const matchingIndex = result?.cartItems?.findIndex(
              (firstObj) =>
                firstObj.pizza.toString() === secondObj.pizza.toString()
            );
            if (matchingIndex !== -1) {
              result.cartItems[matchingIndex].quantity +=
                secondObj.quantity;
            } else {
              result.cartItems = [...result?.cartItems, secondObj];
            }
          });
          userCart = result;
          await userCart.save();
          await cart.delete();
        }
      }
    }*/


    





    //***************************passport block end ******************************/
        






       // passport.authenticate("local-login", (err, user, info) => {

                  /* if (err) {
                    return res.status(500).json({ message: err });
                   }
                   if (!user) {
                    if (info.missingCredentials) {
                      return res.status(404).json({ message: info.message });
                    }
                    if (info.alreadyLoggedIn) {
                      return res.status(400).json({ message: info.message });
                    }
                    if (info.accountNotExists) {
                      return res.status(404).json({ message: info.message });
                    }
                    if (info.passwordInvalid) {
                      return res.status(401).json({ message: info.message });
                    }
                   }
                   if (user) {
                    const accessToken = generateAccessToken(user, "local");
                    const refreshToken = generateRefreshToken(user, "1d", "local");
                    res.cookie("cartId", "PizzaDelivery", {
                      maxAge: -1,
                    });
                    res.cookie("refreshToken", refreshToken, {
                      maxAge: 1000 * 60 * 60 * 24,
                      httpOnly: true,
                      sameSite: "Strict",
                    });
                    return res.status(200).json({
                      token: accessToken,
                      user,
                      message: "User Logged-In successfully!",
                    });
                  }*/
                
                
               

    


 