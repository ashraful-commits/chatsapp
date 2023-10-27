import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const url="https://chat-app-ir8p.onrender.com"
// const url = "http://localhost:3030";
export const RegisterUser = createAsyncThunk("user/RegisterUser",async(data)=>{
try {
    
    const response = await axios.post(`${url}/api/v1/auth/`,data,{withCredentials:true})
    
    return response.data
} catch (error) {
    throw new Error(error.response.data.message)  
}
})
export const UserLogin = createAsyncThunk("user/UserLogin",async(data)=>{
  
   try {
    const response = await axios.post(`${url}/api/v1/auth/login`,data,{withCredentials:true})
    return response.data
   } catch (error) {
    throw new Error(error.response.data.message)
   }
    // return response.data
})
export const GetAllUser = createAsyncThunk("user/GetAllUser",async()=>{
  
   try {
    const response = await axios.get(`${url}/api/v1/auth`,{withCredentials:true})
    
    return response.data
   } catch (error) {
    throw new Error(error.response.data.message)
   }
})
export const LoggedInUser = createAsyncThunk("user/LoggedInUser",async()=>{
  try {
    
      const response = await axios.get(`${url}/api/v1/auth/me`,{withCredentials:true})
      
      return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})
export const UpdateUser = createAsyncThunk("user/UpdateUser",async(data)=>{
 try {
    
     const response = await axios.put(`${url}/api/v1/auth/${data.id}`,{avatar:data.avatar},{withCredentials:true})
     
     return response.data
 } catch (error) {
    throw new Error(error.response.data.message)
 }
})
export const LogoutUser = createAsyncThunk("user/LogoutUser",async()=>{
 try {
    
     const response = await axios.get(`${url}/api/v1/auth/logout`,{withCredentials:true})
   
     return response.data
 } catch (error) {
    throw new Error(error.response.data.message)
 }
})