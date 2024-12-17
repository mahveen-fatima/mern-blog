// require('dotenv').config({path: './env'}) correct but inconsistent as says require but not import


  

import dotenv from "dotenv" // will not work like this should write config
dotenv.config({
    path: './.env'
})
// importing db here
import connectDB from "./db/index.js";
import { app } from "./app.js";




// a async method returns promise thats why adding .then and .catch
connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("listening to error before connection failed error: ", error);
        throw error
    })
})
.then( () => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB db connection failed !!! ", err);
    
})