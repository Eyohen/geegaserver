const Message = require ("../models/message.js")
const { createError } = require ("../utils/error.js");
const Conversation =  require ("../models/conversation.js");

const createMessage = async(req,res,next) =>{
   
    const newMessage = new Message({
      
        conversationId: req.body.conversationId,
        userId: req.userId,
        description: req.body.description
    });    

   try{
    const savedMessage = await newMessage.save()
    await Conversation.findOneAndUpdate({id: req.body.conversationId},{
        $set:{
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
            lastMessage: req.body.description
        },
    },
        {new:true}
    );
    res.status(201).send(savedMessage);
    
    } catch(err){
        next(err)
    }
}


const getMessages = async(req,res,next) =>{
   
   try{
    const messages = await Message.find({conversationId: req.params.id});
   res.status(200).send(messages);
   
    } catch(err){
        next(err)
    }
}





module.exports = {createMessage, getMessages}