import {Paper, createStyles, TextInput, PasswordInput,Checkbox, Button, Title,
        Text, Divider, Group, Notification, } from "@mantine/core";
  
  
  // @mantine/form package does not depend on any other libraries, you can use it with or without @mantine/core
  import { useForm, hasLength } from "@mantine/form";
  
  
  import { Link } from "react-router-dom";
  
  // By using useSelector and useDispatch from react-redux, we can read state from a Redux store and dispatch any action from a component, respectively.
  import { useNavigate  } from "react-router-dom";

  import { useDispatch, useSelector } from "react-redux";
  import { createPizzaEntry } from "../../redux/slices/pizzaSlice";
  import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
  import { useEffect, useMemo, useState  } from "react";
  import background from "../../assets/pizzabig03.jpg";
  import FileBase from "react-file-base64";

  
  
      const initialState = { name: "", description: "", price: 0, tags: []};

     const useStyles = createStyles((theme) => ({
     wrapper: {
      Height: `10vh`,
   
      backgroundSize: "cover",
      backgroundImage:`url(${background})`,
      "&:before": {
        position: "absolute",
        content: "''",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(to left top, rgb(203 25 21 / 45%) 0%, rgb(237 59 55 / 45%) 100%)`,
       },
      
     },
  
  
     form: {borderRight: `1px solid ${theme.colorScheme === "dark" ? 
           theme.colors.dark[7] : theme.colors. gray[3]
      }`,
      minHeight: `100vh`,
      maxWidth: `50%`,
      paddingTop: 80,
      position: "relative",
      zIndex: 99,
  
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: "100%",
      },
     },
  
     title: {color: theme.colorScheme === "dark" ? theme.white : theme.black,fontFamily: `Greycliff  CF,  ${theme.fontFamily}`, },
  
      logo: {color: theme.colorScheme === "dark" ? theme.white : theme.black,
      width: 120,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      },
     redirecter: {
      textDecoration: "none",
      fontWeight: 700,
      color: theme.colors.orange,
      },
      }));
  
       const CreatePizzaEntry = () => {


        const { pizza } = useSelector((state) => ({ ...state.pizza }));


      // local const tourData
      const [pizzaData, setPizzaData] = useState(initialState);

      // local const { title, description, tags } tourData instance 
     const { title, description, price, image, tags } = pizzaData;

     // local const tagErrMsg
      const [tagErrMsg, setTagErrMsg] = useState(null);

      const { classes } = useStyles();
  
     // We can read data from the store with useSelector
    
     const { loading, error, success, message, } = useSelector((state) => state.pizza.createPizzaEntry);
  
     const dispatch = useDispatch();
     const navigate = useNavigate();
  
     useMemo(() => {
      document.title = "Register Pizza | Pizza Fleet";
      return () => {
        document.title = "Pizza Fleet";
      };
     }, []);
  
     useEffect(() => {
     /* if (success) {dispatch(clearRegister());}*/
  
      alert("Estoy en useEffect, success: "+success)
      
     form.reset();
     // return () => {dispatch(clearRegister());};
    
     }, [success]);   //[dispatch ,success,message]
  
    
     // function to handle input entries
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPizzaData({ ...pizzaData, [name]: value });
  };



     const handleSubmit = (values) => {
      
        //if (!tags.length) {setTagErrMsg("Please provide some tags");}
    
        if (title && description && price) 
            {const updatedPizzaData = { 
              ...pizzaData, name: pizza?.result?.name, image:pizzaData }


            alert("Estoy en createPizzaEntry.js - line 124")
          // if there is not id - create one
        dispatch(createPizzaEntry({ updatedPizzaData }));
        dispatch(createPizzaEntry(values));}
    


      if (!form.isValid()) {return} else {
        alert("Estoy en createPizzaEntry.js - line 140")
        alert("Estoy en createPizzaEntry.js - line 141- values.name:"+values.name)
        //const updatedPizzaData = { ...pizzaData, name: pizza?.result?.name, image:pizzaData }
        
        const updatedPizzaData = { ...pizzaData, name: pizza?.result?.name, image:pizzaData }
        
        values.image = pizzaData.image;
        
        
        alert("Estoy en createPizzaEntry.js - line 149- values.image :"+ values.image)
        alert("Estoy en createPizzaEntry.js - line 150- values.description:"+ values.description)
        alert("Estoy en createPizzaEntry.js - line 150- values.name:"+ values.name)

        dispatch(createPizzaEntry((values  )))
      //dispatch(createPizzaEntry(values));
    }
  
      /*if (success){
      // Resets form.values to initialValues,
      // clears all validation errors,
      // resets touched and dirty state
    
      form.reset();}*/};
    
    
     const form = useForm({
      initialValues: {
        name: "",
        description: "",
        value:0,},
      validate: {
        name: (value) =>
          /^[a-zA-Z]{2,}(?:[\s'-][a-zA-Z]+)*$/.test(value)
            ? null
            : "Invalid first name!",
        description: (value) =>
          /^[a-zA-Z]*$/.test(value),
           
        /*price: (value) =>
        /^[2-9]$/.test(value)
        ? null
        : "Price must be between 200 and 4000",*/
      },
      validateInputOnBlur: true,
     }); 
  
     return (
         <div className={classes.wrapper}>
         <Paper sx={(theme) => ({backgroundColor: theme.colorScheme === "dark" ? "#0e1012" : "#e9e9ec",})}
          className={classes.form} radius={0} p={30}>
          <Title order={3} className={classes.title} align="center" mt="md" mb={50}>
            Welcome back to Pizza Delivery!
          </Title>
          {error && (<Notification disallowClose color="red" title=""
              sx={{ borderColor: "red",}}
              styles={{ title: { fontSize: 16 }, description: { fontSize: 14 } }}
              icon={<IoCloseOutline size={20} />}
              mb="sm">
              {message}
            </Notification>
          )}
          {success && (<Notification disallowClose color="green" title="Success" sx={{borderColor: "green",}}
              styles={{ title: { fontSize: 16 }, description: { fontSize: 14 } }}
              icon={<IoCheckmarkOutline size={20} />}
              mb="sm">
              {message}
            </Notification>
          )}
          {loading && (<Notification disallowClose color="indigo" loading sx={{
                borderColor: "indigo",}}
              styles={{ title: { fontSize: 16 }, description: { fontSize: 14 } }}
              mb="sm" >
              {message}
            </Notification>
            
          )}
          <h2>success:{success}, message:{message}, error:{error}</h2>
          <form onSubmit={form.onSubmit(handleSubmit)} id="register-form">
          
            <TextInput withAsterisk label="Name" name="name" placeholder="Pizza ......"
              disabled={loading} size="md" {...form.getInputProps("name")}/>
  
            <TextInput withAsterisk label="description" name="description" placeholder="Cheese, bacon.."
              disabled={loading} size="md" mt="md"
              {...form.getInputProps("description")}/>
            
            <TextInput withAsterisk label="price" name="price" placeholder="200"
              disabled={loading} mt="md" size="md"
              {...form.getInputProps("price")} />
  

            <div className="d-flex justify-content-start">
              <FileBase type="file"
                multiple={false}
                onDone={({ base64 }) =>
                setPizzaData({ ...pizzaData, image: base64 })}
                {...form.getInputProps("image")}/>
            </div>
             <br/>
             <br/>
            <Button loading={loading} type="submit" fullWidth mt="xl" size="md">
              Register Pizza
          </Button>
          </form>
  
         
          

          


         </Paper>
         </div>
     );
          
          }
  export default CreatePizzaEntry;