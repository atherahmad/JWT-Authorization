import express from "express";
const router = express.Router();
import {authorizeToken} from "../middleware/authorization.js";
import {addFavorites, removeFavorites,users, teaList} from "../dataset.js"

router.post("/set",authorizeToken, addFavorites)
router.post("/unset",authorizeToken, removeFavorites)
router.get("/list", authorizeToken,(req,res)=>{
    const favoriteItems = users.find(user=>user.userName === req.userName)["favorites"]
    if(favoriteItems) res.json(favoriteItems)
    else res.status(401).json("Bad request")
})
router.get("/detailedlist", authorizeToken, (req,res)=>{

    const favoriteList = users.find(user=>user.userName === req.userName)["favorites"]

    res.json(favoriteList.map(item=>teaList.find(tea=>+item === tea.teaId )))
})

export default router;