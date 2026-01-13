import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.config.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest,functions } from './src/inngest.js'
import movieRoutes from './src/routes/movie.routes.js'

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
app.use('/api',movieRoutes)

app.use("/api/inngest", serve({ client: inngest, functions }));


//server
app.listen(PORT,()=>{
     console.log(`Server is running on http://localhost:${PORT}`);
    
})