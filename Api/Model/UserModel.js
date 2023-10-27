import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
},{timestamps:true})
 export default mongoose.model("ChatUser",userSchema)