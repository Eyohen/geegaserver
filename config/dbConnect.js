const { default: mongoose} = require("mongoose")

const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error){
        console.log("Database Error")
    }
}

module.exports = dbConnect