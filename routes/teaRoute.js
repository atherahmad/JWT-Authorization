import express from "express";
const router = express.Router();
import { teaList} from "../dataset.js"

router.get("/all",(req, res)=>{
    res.json(teaList)
})

export default router;