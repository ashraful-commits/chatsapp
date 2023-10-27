import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://chatapps-v5tm.onrender.com";
// const url = "http://localhost:3030";
export const getChatUser = createAsyncThunk(
  "Chats/getChatUser",
  async ({ senderId, receiverId }) => {
    try {
      const response = await axios.get(
        `${url}/api/v1/chat/${senderId}/${receiverId}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getSingleChats = createAsyncThunk(
  "Chats/getSingleChats",
  async ({ senderId }) => {
    try {
      const response = await axios.get(`${url}/api/v1/chat/${senderId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create data
export const CreateChats = createAsyncThunk(
  "Chats/CreateChats",
  async ({ senderId, receiverId }) => {
    try {
      const response = await axios.post(
        `${url}/api/v1/chat`,
        { senderId, receiverId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const deleteMsg = createAsyncThunk("Chats/deleteMsg", async (id) => {
  try {
    const response = await axios.delete(
      `${url}/api/v1/chat/${id}`,

      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
