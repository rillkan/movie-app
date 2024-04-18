import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/posts/moviesSlice"

export default configureStore({
  reducer: {
    movies: moviesReducer,
  },
});