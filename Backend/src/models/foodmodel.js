const mongoose = require('mongoose')
const foodpartnermodel = require('./foodpartner')


const foodmodelschema = new mongoose.Schema({
    Name:{
     type:String,
     require:true
    },
    Video:{
    type:String,
    require:true
    },
    description:{
     type:String
    },
    url:{
     type:String
    },
    foodpartner:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Foodpartner"
    },
    likecount:{
        type:Number,
        default:0
    },
    savesCount:{
        type:Number,
        default:0
    }
})

const foodmodel = mongoose.model("food",foodmodelschema)

module.exports=foodmodel;