process.on('uncaughtException',(err) => {
    console.log('error',err);
})

import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './database/dbConnection.js'

import { AppRoutes } from './index.routes.js'
import { AppError } from './src/utils/AppError.js';


dotenv.config();
const app = express()
const port = process.env.PORT 



//App use
AppRoutes(app, express)

//databaseConnection
dbConnection()


//App HandelUnHandelError
app.use('*', (req, res, next) => {
    next(new AppError("Not Found", 404));
    //404 Not Found
 })
 
 process.on('unhandleRejection' , (err) => {
     console.log("error", err);
 })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))