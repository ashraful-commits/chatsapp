import { createSlice } from "@reduxjs/toolkit";
import { GetAllUser,   LoggedInUser,   LogoutUser,  RegisterUser, UpdateUser, UserLogin,  } from "./AuthApiSlice";

const AuthSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        contact:null,
        loggedInData:null,
        error:null,
        message:null,
        loading:false
    },
    reducers: {
        setMessageEmpty: (state, action) => {
          state.message = null;
          state.error = null;
        },
      },
    extraReducers:(builder)=>{
        builder.addCase(RegisterUser.pending,(state,action)=>{
            state.loading=true
        }).addCase(RegisterUser.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action.payload.message
        }).addCase(RegisterUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        }).addCase(GetAllUser.pending,(state,action)=>{
            state.loading=true
        }).addCase(GetAllUser.fulfilled,(state,action)=>{
            state.loading=false
            state.contact = action.payload.user
        }).addCase(GetAllUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error?.message
        }).addCase(UserLogin.pending,(state,action)=>{
            state.loading=true
        }).addCase(UserLogin.fulfilled,(state,action)=>{
           
            state.loading=false
            state.user = action.payload.user
            state.message=action.payload.message
            localStorage.setItem("LoggedInUser",JSON.stringify(action.payload.user))
        }).addCase(UserLogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message

        }).addCase(LoggedInUser.pending,(state,action)=>{
            state.loading=true
        }).addCase(LoggedInUser.fulfilled,(state,action)=>{
            
            state.loading=false
            state.loggedInData = action.payload.user
            state.message=action.payload.message
        }).addCase(LoggedInUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        }).addCase(UpdateUser.pending,(state,action)=>{
            state.loading=true
        }).addCase(UpdateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user[state.user.findIndex((item)=>item._id==action.payload.user._id)]=action.payload.user
            state.message=action.payload.message
        }).addCase(UpdateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          
        }).addCase(LogoutUser.pending,(state,action)=>{
            state.loading=true
        }).addCase(LogoutUser.fulfilled,(state,action)=>{
            state.loading=false
            
        }).addCase(LogoutUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          
        })
    }
})

export const getAllSate = state=>state.User
export const {setMessageEmpty}= AuthSlice.actions
export default AuthSlice.reducer