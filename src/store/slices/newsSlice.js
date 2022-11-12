import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BACKEND_URL } from "../../shared/constans";

const initialState = {
  news: [],
  comments: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, { payload }) => {
      state.news = payload;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments = payload;
    });
  },
});

export const fetchNews = createAsyncThunk("news/fetch", async () => {
  const news = await axios.get(`${BACKEND_URL}/api/get`);
  return news.data;
});

export const fetchComments = createAsyncThunk("comments/fetch", async (id) => {
  const comments = await axios.get(`${BACKEND_URL}/api/comments/${id}`);
  return comments.data;
});

export const newsReducer = newsSlice.reducer;
