import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { NewsItem, CommentType } from "../../shared/types";
import { BACKEND_URL } from "../../shared/constans";

export interface NewsState {
  news: NewsItem[];
  comments: Record<string, CommentType[]>;
  isNewsLoading: boolean;
  isCommentsLoading: boolean;
}

const initialState = {
  news: [],
  comments: {},
  isNewsLoading: false,
  isCommentsLoading: false,
} as NewsState;

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.isNewsLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload }) => {
      state.news = payload;
      state.isNewsLoading = false;
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.isCommentsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments[payload.id] = payload.comments;
      state.isCommentsLoading = false;
    });
  },
});

export const fetchNews = createAsyncThunk("news/fetch", async () => {
  const news = await axios.get(`${BACKEND_URL}/api/get`);
  return news.data;
});

interface fetchCommentsProps {
  newsId: number;
  ids: number[];
}

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async ({ newsId, ids }: fetchCommentsProps) => {
    const comments = await axios.post(`${BACKEND_URL}/api/comments`, {
      ids,
    });

    return { id: newsId, comments: comments.data };
  }
);

export const newsReducer = newsSlice.reducer;
