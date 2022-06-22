// import express package

import express from "express";

import config from "config";

import {} from "dotenv/config";

import cors from "cors";

import { authorizeToken, generateToken, } from "./middleware/authorization.js";

import {users, teaList, setUser, addFavorites, removeFavorites} from "./dataset.js";
// create an express instance

const app = express();


// PORT declaration

//const PORT = process.env.PORT || 4000;

 const PORT = 6068 || config.get('app.port') 

app.use(cors())
// parsing the body with express bodyParser

app.use(express.json())







app.post("/api/signup", (req,res)=>{
    setUser({
        userName:req.body.username,
        fullName:req.body.fullName,
        password:req.body.password,
        favorites:[]
        }
        )
    res.json("ok")
    //res.json({data:posts.filter(post => post.userName === req.user.name)})
})

app.post("/api/signin", generateToken)

app.get("/api/toplist",(req, res)=>{
    res.json(teaList)
})
app.get("/api/getfavorite", authorizeToken,(req,res)=>{
    const favoriteItems = users.find(user=>user.userName === req.userName)["favorites"]
    if(favoriteItems) res.json(favoriteItems)
    else res.status(401).json("Bad request")
})
app.get("/api/validate",authorizeToken ,  (req, res)=>{
    res.json(req.user)
})

app.post("/api/auth/favorite/set",authorizeToken, addFavorites)
app.post("/api/auth/favorite/unset",authorizeToken, removeFavorites)

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT} `);
})
