import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

//middelware
app.use(express.json())

//test route
app.get('/',(req,res)=>{
    res.status(201).json({message:'Hello from backend side'})
})

//API route
app.get('/api/home',(req,res)=>{
    res.status(201).json({message:'Hello from home'})
})


//server
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
    
})