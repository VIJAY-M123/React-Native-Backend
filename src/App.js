const Database = require('./Database')
const express = require('express');
const cors = require('cors');
const  routes  = require('./routes');
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;


const startApp = async() =>{
    try{
        await Database();

        app.use("/", routes)
        app.use("/register",routes);

        app.listen(port, () => {
         console.log(`App listening on port ${port}`);
        });
    }
    catch(err){
        console.log('Error closing MongoDB connection:', err);
    }  

}
startApp()
