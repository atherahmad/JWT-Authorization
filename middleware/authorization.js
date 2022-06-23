import jwt from "jsonwebtoken";
import { users } from "../dataset.js";
import generateToken from "../helpers/generateToken.js";



export const authorizeToken = (req, res, next) =>{

    const authHeader = req.headers["authorization"];

    // req.headers["authorization"] : Bearer "then the token" bearer and token will be combined string

    // in case of Bearere
   // const token = authHeader && authHeader.split(" ")[1];

   const token = authHeader;


    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {

        if(err) return res.sendStatus(403) ; // Forbbiden 
        req.userName =   user && user.userName;
        req.fullName =   user && user.fullName;

        next()
    })
    
}

export const loginHandler =  (req,res) =>{

        // Authentication : to verify who is the user , we will authenticate with e.g. passport.js

        const userName = req.body.username;
        const password = req.body.password;

        const currentUser =users.find(user=>user.userName === userName && user.password === password)

        if(!currentUser) return     res.sendStatus(403).json("Forbidden")
        const token =  generateToken({fullName :currentUser.fullName, userName: currentUser.userName})

        if(!token) return res.status(401).json("Access denied")
            
        else res.status(200).json({accessToken:token,userName:currentUser.fullName})
        
        


    // After Authentication we authorize the user 

    // Authorization : to check the user either he is authorized for the request or page (with JWT)
}