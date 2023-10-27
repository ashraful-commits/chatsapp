import { createSlice } from "@reduxjs/toolkit";
import {
  CreateMessage,
  deleteMsg,
  getAllMessage,
  getAllSpacificUser,
} from "./MessageApi";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    message: "null",
    isError: "",
    error: "",
    isLoading: false,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.messages;
        state.message = action.payload.message;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(CreateMessage.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateMessage.fulfilled, (state, action) => {
        state.isLoading = false;

        state.message = action.payload.message;
      })
      .addCase(CreateMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(deleteMsg.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteMsg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = [
          ...state.messages.filter(
            (item) => item._id !== action.payload.messages._id
          ),
        ];
        state.message = action.payload.message;
      })
      .addCase(deleteMsg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(getAllSpacificUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllSpacificUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.messages ? action.payload.messages : [];
      })
      .addCase(getAllSpacificUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});
export const getAllMessageState = (state) => state.Message;
export const { setMessageEmpty } = messageSlice.actions;
export default messageSlice.reducer;
