const mongoose = require("mongoose");



const conversationSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
      
    },
    sellerId:{
        type:String,
        // trim: true,
        required: true,
      
    },
    buyerId:{
        type:String,
        required:true
    },
    readBySeller:{
        type:Boolean,
        default:true

    },
    readByBuyer:{
        type:Boolean,
        default:true

    },
    lastMessage:{
        type:String,
        required: false
    },

    
}, {timestamps:true}
);





module.exports = mongoose.model("Conversation", conversationSchema);