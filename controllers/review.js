const Review = require ("../models/review.js");
const { createError } = require ("../utils/error.js");
const Gig =  require ("../models/gig.js");

const createReviews = async(req,res,next) =>{
    if(req.isSeller) return next(createError(403,"Sellers can't create reviews!"));

    const newReview = new Review({
        userId:req.userId,
        gigId: req.body.gigId,
        description: req.body.description,
        star: req.body.star,
    })        

    try{
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });
        if (review) return next(createError(403, "You have already created a review for this gig"));
        const savedReview = await newReview.save();


        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: {totalStars : req.body.star, starNumber:1},
        });
        res.status(201).send(savedReview);
    } catch(err){
        next(err)
    }
}

const getReviews = async(req,res,next) =>{
    try{
    const reviews = await Review.find({gigId : req.params.gigId})
    res.status(200).send(reviews);
    } catch(err){
        next(err)
    }
}

const deleteReviews = async(req,res,next) =>{
    try{

    } catch(err){
        next(err)
    }
}

module.exports = {createReviews,getReviews, deleteReviews}