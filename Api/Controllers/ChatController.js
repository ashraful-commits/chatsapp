import expressAsyncHandler  from "express-async-handler";
import ChatModel from "../Model/ChatModel.js";

// =======================get message==============
export const getChat =expressAsyncHandler(async(req,res)=>{
  const {senderId,receiverId}=req.params
    const data = await ChatModel.findOne({members:{$all:[senderId,receiverId]}}).populate("members").exec();
    if(data.length<=0){
      return  res.status(200).json({message:"No chat"}) 
    }
   return res.status(200).json({chats:data,message:"get chat"})
})
export const getSingleChat =expressAsyncHandler(async(req,res)=>{
  const {senderId}=req.params
  if(!senderId){
    return res.status(404).json({message:"no chat id"})
  }
    const data = await ChatModel.find({members:{$in:[senderId]}}).populate("members").exec();
   
    if(data.length<=0){
      return  res.status(200).json({message:"No chat"}) 
    }
   return res.status(200).json({chats:data,message:"get chat"})
})
export const createChat =expressAsyncHandler(async(req,res)=>{
  const {senderId,receiverId}=req.body
  
    const data = await ChatModel.create({
        members:[senderId,receiverId]
    })
    if(data.length<=0){
      return  res.status(200).json({message:"Chat not created"}) 
    }
   return res.status(200).json({chats:data,message:"Chat created"})
})

