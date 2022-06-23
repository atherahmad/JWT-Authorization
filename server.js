// import express package

import express from "express";

import config from "config";

import {} from "dotenv/config";

import cors from "cors";


import authRoute from "./routes/authRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js"
import teaRoute from "./routes/teaRoute.js"
// create an express instance

const app = express();


// PORT declaration

//const PORT = process.env.PORT || 4000;

 const PORT = 6068 || config.get('app.port') 

app.use(cors())
// parsing the body with express bodyParser

app.use(express.json())



app.use("/api/tea", teaRoute)
app.use("/api/auth",authRoute)
app.use("/api/favorite", favoriteRoute)



app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT} `);
})
