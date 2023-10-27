import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://chatapps-v5tm.onrender.com";
// const url = "http://localhost:3030";
export const getAllMessage = createAsyncThunk(
  "message/getAllMessage",
  async () => {
    try {
      const response = await axios.get(`${url}/api/v1/message`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// get current and spacifice user message
export const getAllSpacificUser = createAsyncThunk(
  "message/getAllSpacificUser",

  async ({ chatId }) => {
    try {
      const response = await axios.get(`${url}/api/v1/message/${chatId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// create data
export const CreateMessage = createAsyncThunk(
  "message/CreateMessage",
  async (data) => {
    try {
      const response = await axios.post(`${url}/api/v1/message`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const deleteMsg = createAsyncThunk("message/deleteMsg", async (id) => {
  try {
    const response = await axios.delete(
      `${url}/api/v1/message/${id}`,

      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
