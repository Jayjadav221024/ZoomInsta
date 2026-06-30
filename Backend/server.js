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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app