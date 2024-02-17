const express = require("express");
const bcrypt = require("bcrypt");
const helmet = require("helmet"),
mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// Require the passport module, Passport.js uses methods called strategies for
//users to log in. The local strategy refers to the username and password login 
// method.
const passport = require("passport"),
// Use the connect-flash package to create your flash messages. This package is 
// dependent on sessions and cookies to pass flash messages between requests.
connectFlash = require("connect-flash");
//require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
//const cartRoutes = require("./routes/cartRoutes");
//const orderRoutes = require("./routes/orderRoutes");


const dotenv = require("dotenv");

dotenv.config();


// Add Mongoose connection to Express.js
mongoose.connect(
  // Set up the connection to your database.  
   "mongodb://0.0.0.0:27017/pizzareact_db",
  
   
    {// useNewUrlParser: true , // not longer neccesary
    // useFindAndModify: false } // not longer neccesary
    });
  //mongoose.set("useCreateIndex", true); // not longer neccesary
  // Assign the database to the db variable.
  const db = mongoose.connection;
  
  // Log a message when the application connects to the database.
  db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
  });
  

const app = express();




// Capturing posted data from the request body
// analyze incoming request bodies use of req.body


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp" }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "PizzaDelivery Created By ME | Sergio Moncada",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// have the application use connect-flash as middleware.
app.use(connectFlash());


// set uyp the aplication to listen on port 5000
app.set("port", process.env.PORT || 5000);

app.use(passport.initialize());

console.log("Estoy en Backend Server.js - line 86")

app.use("/", authRoutes);
app.use("/pizza", pizzaRoutes);
//app.use("/cart", cartRoutes);
//app.use("/orders", orderRoutes);


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});