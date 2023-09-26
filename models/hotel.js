const mongoose = require("mongoose");



const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true,
      
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    title:{
        type:String,
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
    },
    description:{
        type:String,
        description:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String],

    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }
   
 

    
}, {timestamps:true}
)


module.exports = mongoose.model("Hotel", hotelSchema);