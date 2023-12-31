const Gig = require("../models/gig.js")
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');
const {createError} = require("../utils/error.js")



const createGig = async(req,res,next) => {
    if(!req.isSeller) return next(createError(403, "Only sellers can create a gig"));

    const newGig = new Gig ({
        userId: req.userId,
        ...req.body,
    });
    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch(err){
        next(err);
    }
}

const deleteGig = async(req,res,next) => {

    try{
        const gig = await Gig.findById(req.params.id);
        if(gig.userId !== req.userId) return next(createError(403,"You can delete only your gig!"));
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted");
    } catch(err){
        next(err);
    }
}

const getAGig = async(req,res,next) => {
    try{
        const gig = await Gig.findById(req.params.id);
        if(!gig) next(createError(404,"Gig not found"))
        res.status(200).send(gig);
    } catch(err){
        next(err);
    }
}

const getGigs = async(req,res,next) => {
    const q = req.query;


    const filters = {
        ...(q.userId && {userId:q.userId})  ,
       ...(q.category && {category:q.category})  ,
       ...((q.min || q.max) &&  {price:{...(q.min && {$gte : q.min}),...(q.max && {$lte : q.max})}}),
        ...(q.search && {title:{$regex: q.search, $options:"i"}}),
    }
    try{
        const gigs = await Gig.find(filters).sort({[q.sort]:-1});
        if(!gigs) next(createError(404,"Gigs not found"))
        res.status(200).send(gigs);
    } catch(err){
        next(err);
    }
}

const updateGig = async(req,res,next) => {
    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch(err){
        next(err);
    }
}

// const deleteUser = asyncHandler(async (req, res,next) => {
//     console.log('Ger 1')
//         const user = await User.findById(req.params.id);
//         console.log('Ger 1')

//       if(req.userId !== user._id.toString()){
//             return next(createError(403,"You can delete only your account!"));
          
//            }
//            console.log('Ger 1')

//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).send("User has been deleted");

//   });
  

module.exports = {createGig,
    updateGig, deleteGig, getAGig, getGigs

}