import jwt from "jsonwebtoken";
import { users } from "../dataset.js";


export const authorizeToken = (req, res, next) =>{

    const authHeader = req.headers["authorization"];

    console.log(authHeader)
    // req.headers["authorization"] : Bearer "then the token" bearer and token will be combined string

    // in case of Bearere
   // const token = authHeader && authHeader.split(" ")[1];

   const token = authHeader;


    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {

        if(err) return res.sendStatus(403) ; // Forbbiden 

        req.user =   user && user.fullName;

        next()
    })
    
    next();
}

export const generateToken = (req,res) =>{

        // Authentication : to verify who is the user , we will authenticate with e.g. passport.js

        const userName = req.body.userName;
        const password = req.body.password;
        console.log(req.body)
        console.log(users)
        const currentUser =users.find(user=>user.userName === userName && user.password === password)
        if(!currentUser) {
            return     res.sendStatus(403)}

        const userPayload = {
            fullName: currentUser.fullName
        };
    
        const accessToken =  jwt.sign(userPayload, process.env.ACCESS_SECRET);
        req.accessToken = accessToken;
        
    res.json({accessToken,userName:currentUser.fullName})


    // After Authentication we authorize the user 

    // Authorization : to check the user either he is authorized for the request or page (with JWT)
}