import { createSlice } from "@reduxjs/toolkit";

import { CreateChats, getSingleChats, getChatUser } from "./ChatApiSlice";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    message: "",
    isError: "",
    isLoading: false,
    error: "",
    chatId: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getChatUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatId = action.payload.chats;
        state.message = action.payload.message;
      })
      .addCase(getChatUser.rejected, (state, action) => {
        state.isLoading = false;
        state.chatId = action.payload.chats;
        state.error = action.error.message;
      })
      .addCase(getSingleChats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSingleChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload.chats ? action.payload.chats : [];
        state.message = action.payload.message;
      })
      .addCase(getSingleChats.rejected, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload.chats;
        state.error = action.error.message;
      })
      .addCase(CreateChats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats.push(action.payload.chats);
        state.message = action.payload.message;
      })
      .addCase(CreateChats.rejected, (state, action) => {
        state.isLoading = false;
        state.chats.push(action.payload.chats);
        state.error = action.error.message;
      });
  },
});
export const gtAllChatsState = (state) => state.Chats;
export const { setMessageEmpty } = chatSlice.actions;
export default chatSlice.reducer;
