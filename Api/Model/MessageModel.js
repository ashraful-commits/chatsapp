import mongoose from "mongoose";

const MessageModel = mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId
    },
   senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ChatUser"
   },
   text:{
    type:String
   }
},

{timestamps:true}

)


export default mongoose.model("Messages",MessageModel)