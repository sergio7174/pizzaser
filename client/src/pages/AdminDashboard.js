import { createStyles, Button, Title, Notification, Menu } from "@mantine/core";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },



}));

const goCreateFood=()=>{

          

}


const AdminDashboard=()=>{

  const { classes } = useStyles();
  return (

            <div>
            <h2 className="white">AdminDasboard </h2>
            <br/>
            <br/>
            <Title order={3} className={classes.title} align="center" mt="md" mb={50}>
                 Welcome back to Pizza Delivery Admin ..!
           </Title>
             <br/>

             <Link style={{textDecoration: "none",}}
                    to="/admin/CreatePizzaEntry">
                
                    <Button  mt="md" size="md" > Create Food Entry</Button> &nbsp; &nbsp;
              
                  </Link>
            
            <Button  mt="md" size="md" > List Food Entries</Button>

            </div>


  );}

  export default AdminDashboard;