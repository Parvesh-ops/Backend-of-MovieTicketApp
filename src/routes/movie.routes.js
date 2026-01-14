import express from "express"
import { getHome } from "../controllers/movie.controllers.js"

const router = express.Router()

router.get('/home',getHome)

router.get('/about',(req,res)=>{
    res.json({message:'This is from About page'})
})

router.get('/favorite',(req,res)=>{
    res.json({message:'This is from favorite page'})
})


export default router