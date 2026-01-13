import express from "express"

const router = express.Router()

router.get('/home',(req,res)=>{
    res.json({message:'Hello from home page!!'})
})

router.get('/about',(req,res)=>{
    res.json({message:'This is from About page'})
})

router.get('/favorite',(req,res)=>{
    res.json({message:'This is from favorite page'})
})


export default router