const Pizza = require("../models/pizzaModel");

module.exports = {

  
  getPizzas: async (req, res) => {
    try {
      const { price, search } = req.body;
      const pizzas = await Pizza.find();
      return res.json(pizzas);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },


// create pizza action

CreatePizza: async (req, res) => {

  console.log("Entre a authController - line 23 - local Register");


    //passport.authenticate("local-register", (err, user, info) => {  

    // begining testing block

      
    
            console.log("Estoy en pizzaController  - line 34, req.body: "+req.body);
          
           
    
            let { name, description, price, image  } = req.body;

            console.log("Estoy en pizzaController  - line 40, req.body.image: "+req.body.image);
            console.log("Estoy en pizzaController  - line 41, req.body.name: "+req.body.name);
            console.log("Estoy en pizzaController  - line 42, req.body.description: "+req.body.description);
            console.log("Estoy en pizzaController  - line 43, req.body.price: "+req.body.price);


            if (!name || !description || !price ) {
              const message = "All fields are required!";
              return res.status(404).json({ message });

            } //last if 

            /*** second check block */
     
            existingPizza = null;
            existingPizza = await Pizza.findOne({ name });
            
            console.log("Estoy en la linea 85 - existingUser: "+existingPizza);

            if (existingPizza) {
            
        const message = "An account already exists with this Pizza name!";
        return res.status(303).json({ message });


            }
            console.log("Estoy en pizzaController - line 59, existingPizza: "+existingPizza);
  
            delete existingPizza

    //************************       another block  *****************************//       
            name = name.trim().toLowerCase();
            
            let { tempPizza } = req;
            
            console.log("Estoy en authController - line 66 - tempUser: "+ tempPizza);

            if (!tempPizza) {
              let existingPizza = await Pizza.findOne({ name });
              if (existingPizza) {

                /*return done(null, false, {
                  emailAlreadyExists: true,
                  message:
                    "An account already exists with this email, if you have already registered with this email, please sign in using it!",
                });*/
                const message = "An account already exists with this Name, if you have already registered the Pizza with this name, please change Pizza name!";
                return res.status(303).json({ message });
              } else { 
                
                console.log("EStoy en pizzaController - line 84 - voy a guardar")
                // This function is reused throughout the controller to organize user attributes 
                // in one object. You should create the same functions for your other model controllers.
              
                // hash para encriptar el poassword antes de guardarlo
               // const hashedPassword = await bcrypt.hash(password, 10);
                
                // data from body -> comes from frontend react
                const local ="local";
                getPizzaParams = body => {
                  return {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    image: body.image,
                    //password: hashedPassword,
                    };};
          
          // data instance of User          
          const data = new Pizza(getPizzaParams(req.body));

              // save data info mongodb through mongoose
    
data.save().then(() => {const message = "User created successfully.!";
                         
   // return message to frontend with json.object , and status(201) ..it means save ok - see jason status list                    
                       
  return res.status(201).json( {message} ); })
  
                       
        }(req, res); } 
      
      
      }, //try 0
    }