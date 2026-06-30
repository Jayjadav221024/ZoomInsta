const mongoose = require('mongoose')



const foodpartnerSchema = new mongoose.Schema({
   Name:{
    type: String,
    require: true,
   },
   Email:{
     type: String,
     require: true,
     unique: true,
   },
   Contactname:{
    type: String,
    require: true,
   },
   phone:{
    type: String,
    require: true,
   },
   address:{
    type: String,
    require: true,
   },
   Password: {
      type: String,
      require: true,
    },
})

const foodpartnermodel = mongoose.model('Foodpartner',foodpartnerSchema)

module.exports = foodpartnermodel;