import asyncHandler from 'express-async-handler'

export const getHome =  asyncHandler( async (req,res) => {
    res.json({mwssage : 'This is home page'})
})