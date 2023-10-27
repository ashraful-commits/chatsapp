import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Feature/AuthSlice";
import MessageSlice from "../Feature/MessageSlice";
import ChatSlice from "../Feature/ChatSlice";

const store = configureStore({
    reducer:{
        User:AuthSlice,
        Message:MessageSlice,
        Chats:ChatSlice
    }
})

export default store