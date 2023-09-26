const User = require("../models/user.js")
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');
const {createError} = require("../utils/error.js")


// const {validateMongoDbId} = require("../utils/validateMongodbId");




// update user
const updateUser = asyncHandler(async (req, res,next) => {

    try {

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updatedUser);
    } catch (err) {
       next(err);
    }
  });
  


// delete user
const deleteUser = asyncHandler(async (req, res,next) => {
    // console.log('Ger 1')
        const user = await User.findById(req.params.id);
        // console.log('Ger 1')

      if(req.userId !== user._id.toString()){
            return next(createError(403,"You can delete only your account!"));
          
           }
        //    console.log('Ger 1')

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted");

  });
  
// get single user
const getSingleUser = asyncHandler(async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(user)
    } catch(error){
        return res.status(500).json({message:error})
    }
})

// get all users
const getAllUsers = asyncHandler(async(req, res, next) => {
   
    try{
      const users = await User.find({})
       return  res.json(users)
    } catch(err){
        // return res.status(500).json({message:error})
        next(err)
    }
})

module.exports = {getAllUsers,
    updateUser, deleteUser, getSingleUser

}