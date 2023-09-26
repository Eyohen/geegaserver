const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required: true,
      
    },
    // slug:{
    //     type:String,
    //     // trim: true,
    //     required: true,
    //     unique: true,
    //     lowercase:true,
    // },
    // description:{
    //     type:String,
    //     // trim: true,
    //     required: true,
     
    //  },
    //  price:{
    //     type: Number,
    //     required:true,
    //  },
    
    //  category:{
    //     // type: mongoose.Schema.Types.ObjectId,
    //     type:String,
    //     required:true,
    //    // ref:"Category",
    //  },
    //  quantity:{
    //     type: Number,
    //     required:true,
    //  },
    //  brand:{
    //     type:String,
    //     // enum:["Apple", "Samsung", "Lenovo"],
    //     required:true
    // },
    //  images:{
    //     type:Array,
    //     },
    // color:{
    //     type:String,
    //     // enum:["Black", "Brown", "Red"],
    //     required:true,
    //     },
    // ratings:[
    //     {
    //         star:Number,
    //         postedBy: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    //     },
    // ],
    sold:{
        type:String,
        default:false,
       // select:false,
      
    },
    
}, {timestamps:true}
)

// userSchema.pre("save", async function (next){
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt)

// })

// userSchema.methods.isPasswordMatched = async function (enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// }

module.exports = mongoose.model("Product", productSchema);