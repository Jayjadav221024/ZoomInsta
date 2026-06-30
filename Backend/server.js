//server start
const express = require('express')

require('dotenv').config();
const app  = require('./src/app')
const {connectdb} = require('./src/db/db')


//Connect Database
connectdb()

// app.get('/',(req,res)=>{
//     res.send("hello world")
// });
// app.use((req,res,next)=>{
//     if(!connected){
//         connectdb()
//     }next();
// })

// app.listen(3000,()=>{
//     console.log(`server is running ${3000}`)
// });

module.exports = app