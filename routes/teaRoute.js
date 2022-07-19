import express from "express";
const router = express.Router();
import { teaList} from "../dataset.js"

router.get("/all",(req, res)=>{
    res.json(teaList)
})
router.get("/teadetails/:teaId", (req, res) => {
    const {teaId} = req.params
    const teaDetails = teaList.find(tea => tea.teaId === +teaId)
    if(!teaDetails) res.status(403).json("No tea found")
    else {
        res.status(200).json(teaDetails) }
})

export default router;