import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.config.js'
import { clerkMiddleware } from '@clerk/express'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT

//middelware
app.use(express.json())
app.use(clerkMiddleware())

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