const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim: true,
        required: true,
        unique: true,
      
    },
    email:{
        type:String,
        trim: true,
        required: true,
        unique: true,
        lowercase:true,
    },
    image:{
        type:String,
        required:false,
       
    },
    // city:{
    //     type:String,
    //     required:false,
    // },
    country:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false,
    },
    isSeller:{
        type:Boolean,
        default:false,
    },
    password:{
        type:String,
        trim: true,
        required: true,
        unique: true,
        // min: 4,
        // max: 64,
     },
     isAdmin:{
        type:Boolean,
        default: false
     },
   
    
}, {timestamps:true}
)

module.exports = mongoose.model("User", userSchema);