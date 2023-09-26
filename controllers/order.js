const Order = require("../models/order.js")
const { createError } = require ("../utils/error.js");
const Gig = require("../models/gig.js")

const createOrder = async(req,res,next) =>{

    try{
        const gig = await Gig.findById(req.params.gigId);
        const newOrder = new Order({
            gigId: gig._id,
            image: gig.cover,
            title: gig.title,
            buyerId:req.userId,
            sellerId:gig.userId,
            price:gig.price,
            payment_intent:"temporary"
        });
        await newOrder.save();
        res.status(200).send("successfull")
    } catch(err){
        next(err)
    }
}


const getOrders = async(req,res,next) =>{

    try{
            const orders = await Order.find({
                ...(req.isSeller ? { sellerId: req.userId} : {buyerId: req.userId}),
                isCompleted:true,
            });

            res.status(200).send(orders);
    } catch(err){
        next(err)
    }
}


const deleteOrder = async(req,res,next) =>{

    try{

    } catch(err){
        next(err)
    }
}

module.exports = {createOrder, getOrders, deleteOrder}
