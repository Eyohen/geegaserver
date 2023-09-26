const { createError } = require ("../utils/error.js");
const Conversation =  require ("../models/conversation.js");

const createConvo = async(req,res,next) =>{
    // if(req.isSeller) return next(createError(403,"Sellers can't create reviews!"));

    const newConversation = new Conversation({
      
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
    })        

   try{
    const savedConversation = await newConversation.save()
    res.status(201).send(savedConversation);
    } catch(err){
        next(err)
    }
}


const updateConvo = async(req,res,next) =>{
    
   try{
    const updatedConversation = await Conversation.findOneAndUpdate({id:req.params.id},
        {$set:{
            // readBySeller: true,
            // readByBuyer: true,
            ...(req.isSeller ? { readBySeller: true} : {readByBuyer: true}),
        },},
        {new: true}
        );
        res.status(200).send(updatedConversation)
    
    } catch(err){
        next(err)
    }
}

const getConvos = async(req,res,next) =>{
    console.log(`hello-${req?.userId}`)
    try{
        const conversations = await Conversation.find(
            req.isSeller ? {sellerId:req.userId} : {buyerId:req.userId}
            
            ).sort({updatedAt:-1});
            res.status(200).send(conversations)
    } catch(err){
        next(err)
    }
}


const deleteConvos = async(req,res,next) =>{
    try{

    } catch(err){
        next(err)
    }
}

const getSingleConvo = async (req, res, next) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
    } catch (err) {
      next(err);
    }
  };



module.exports = {createConvo,getConvos, deleteConvos, getSingleConvo, updateConvo}