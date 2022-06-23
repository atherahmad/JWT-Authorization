import express from "express";
const router = express.Router();
import { authorizeToken, loginHandler, } from "../middleware/authorization.js";
import {setUser} from "../dataset.js"


router.post("/signin", loginHandler);
router.get("/validate",authorizeToken ,  (req, res)=>{
    res.json(req.fullName)
})
router.post("/signup", (req,res)=>{
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

export default router;