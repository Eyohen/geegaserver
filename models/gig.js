const mongoose = require("mongoose");



const gigSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
      
    },
    title:{
        type:String,
        // trim: true,
        required: true,
      
    },
    description:{
        type:String,
        required:true
    },
    totalStars:{
        type:Number,
        default:0

    },
    starNumber:{
        type:Number,
        default:0

    },
    category:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    cover:{
        type:String,
        required: true
    },
    images:{
        type:[String],
        required: false
    },
    shortTitle:{
        type:String,
        required: true
    },
    shortDescription:{
        type:String,
        required: true
    },
    deliveryTime:{
        type:Number,
        required: true
    },
    revisionNumber:{
        type:Number,
        required: true
    },
    features:{
        type:[String],
        required: false
    },
    sales:{
        type:Number,
        default:0
    },
    // roomNumbers:[{number:Number, unavailableDates:{type:[Date]}}],


    
}, {timestamps:true}
);





module.exports = mongoose.model("Gig", gigSchema);