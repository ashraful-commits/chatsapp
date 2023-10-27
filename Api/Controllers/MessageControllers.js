import expressAsyncHandler  from "express-async-handler";
import MessageModel from "../Model/MessageModel.js";
// =======================get message==============
export const getAllMessage =expressAsyncHandler(async(req,res)=>{
  const {chatId}=req.params
    const data = await MessageModel.find(chatId).populate("senderId")
    if(data.length<=0){
      return  res.status(200).json({message:"All message"}) 
    }
   return res.status(200).json({messages:data,message:"All message"})
})
export const getSpacificUserData = expressAsyncHandler(async (req, res) => {
  const {id}= req.params  
if(!id)return false
 const data = await MessageModel.find({chatId:id}).populate("senderId");
  
    if (data.length <= 0) {
      return res.status(200).json({messages: [], message: "No matching messages" });
    }
    return res.status(200).json({ messages: data, message: "Filtered messages" });
  });
//=======================create message================
export const createMessage =expressAsyncHandler(async(req,res)=>{
    const {message,senderId,chatId}= req.body
    const data = await MessageModel.create({
        text:message,
        senderId:senderId,
        chatId:chatId
    })

    if(!data){
        return res.status(404).json({message: "data not create"})
    }else{
        return res.status(200).json({messages:data,message: "Message send!"})

    }
})
export const deleteMessage =expressAsyncHandler(async(req,res)=>{
    const {id}= req.params
    const data = await MessageModel.findByIdAndDelete(id)

    if(!data){
        return res.status(404).json({message: "data not deleted"})
    }else{
        return res.status(200).json({messages:data,message: "Message deleted"})

    }
})