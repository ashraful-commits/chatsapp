import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
   members:{
    type:[mongoose.Schema.Types.ObjectId],
    default:[]
   }
},

{timestamps:true}

)


export default mongoose.model("Chat",ChatSchema)