import { configureStore } from "@reduxjs/toolkit";

import { newsReducer } from "./slices";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
