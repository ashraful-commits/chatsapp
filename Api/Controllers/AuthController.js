import asyncHandler from "express-async-handler"
import UserModel from "../Model/UserModel.js"
import { hashPassword } from "../Helper/CreateHashPassword.js"
import { PassCompare } from "../Helper/PassCompare.js"
import { createToken } from "../Helper/CreateToken.js"

// get all user 
export const getAllUser = asyncHandler(async(req,res)=>{
    

    const data = await UserModel.find().sort({updatedAt:1})
    if(data.length<=0){
        return res.status(200).json({message:"User Not found"})
    }
   return res.status(200).json({user:data,message:"Get all user!"})

   
})
//====================== register user
export const RegisterUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body
    
const isUserExist = await UserModel.findOne({username})
if(isUserExist){
    res.status(400).json({message:"User Already Exist!"})
}else{
    const data = await UserModel.create({username,email,password:hashPassword(password)})
    res.status(200).json({user:data,message:"User created Successfully!"})
}
   
})
//====================== update  user
export const UserUpdate = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {avatar} = req.body
    
    const data = await UserModel.findByIdAndUpdate(id,{avatarImage:avatar?avatar:"",isAvatarImageSet:avatar?true:false})
   
    if(!data) {res.status(404).json({message:"Not created!"})}
    else{
    res.status(200).json({user:data,message:"User Updated Successfully!"})
   } 
})

// ====================== login user
export const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const isUserExist = await UserModel.findOne({ email });
  
    if (!isUserExist) {
      return res.status(400).json({ message: "Email Not Exist!" });
    } 
      const isPass = PassCompare(password, isUserExist.password);
      if (!isPass) {
        return res.status(400).json({ message: "Password Not Match!" });
      }
        const token = createToken(
          { id: isUserExist._id, email: isUserExist.email },process.env.JWT_SECRECT,
          "30m"
        );
        // Set the cookie
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.APP_ENV === "development" ? true : true,
          sameSite: "strict",
          path: "/",
          maxAge: 1000 * 60 * 30, // 30 minutes
        });
        // Send the JSON response
        return res.status(200).json({ message: "Login successful!",user:isUserExist });
      
    
  });
  
//====================== me
export const me = asyncHandler(async(req,res)=>{
  
   if(!req.me){
     res.status(404).json({message:"Please Login!"})
   }
   else{
     res.status(200).json({user:req.me})
   }
})
//====================== Logout
export const Logout = asyncHandler(async(req,res)=>{
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.APP_ENV === "development" ? false : true,
      sameSite: "strict",
      path: "/",
      maxAge: 0, 
    });
    res.json({ message: "Logout success!" });
  } catch (error) {
    // Handle any errors here
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
  
})