// import express package

import express from "express";

import config from "config";

import {} from "dotenv/config";

import cors from "cors";

import { authorizeToken, generateToken } from "./middleware/authorization.js";

import {users, teaList, setUser} from "./dataset.js";
// create an express instance

const app = express();


// PORT declaration

//const PORT = process.env.PORT || 4000;

 const PORT = 6068 || config.get('app.port') 

app.use(cors())
// parsing the body with express bodyParser

app.use(express.json())







app.post("/api/signup", (req,res)=>{
    setUser(req.body)
    res.json("ok")
    //res.json({data:posts.filter(post => post.userName === req.user.name)})
})

app.post("/api/signin", generateToken)

app.get("/api/toplist", (req, res)=>{
    res.json(teaList)
})


app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})