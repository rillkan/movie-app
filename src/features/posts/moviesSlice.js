//moviesSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const BASE_URL = "https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev"

//Async thunk for fetching users movies
export const fetchMoviesByUser = createAsyncThunk( //async operation are tasks that may takes time to render
  "movies/fetchByUser",
  async (userId) => { //perform an async with a parameter of userId //if dont need, can be empty ()
    const response = await fetch(`${BASE_URL}/moviedetails/user/${userId}`);
    console.log("Response JSON:", response.json)
    return response.json(); //convert to json
  }
)

/* export const saveMovie = createAsyncThunk(
  "movies/saveMovie",
  async ({ userReview, date, movie_rating, Poster, Title, Year, currentUser, imdbID }) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const data = {
            user_Review: userReview,
            date_Watched: new Date(date).toISOString().split("T")[0],
            user_uid: currentUser.uid,
            movie_rating: movie_rating,
            movie_poster: Poster,
            movie_name: Title,
            movie_year: Year,
            imdb_id: imdbID
          };
          try {
            const response = await axios.post(`${BASE_URL}/addallmoviedetails`, data);
            resolve(response.data);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
); */

export const saveMovie = createAsyncThunk(
  "movies/saveMovie",
  async ({ userReview, date, movie_rating, Poster, Title, Year, currentUser, imdbID }) => {
    const data = {
      user_Review: userReview,
      date_Watched: new Date(date).toISOString().split("T")[0],
      user_uid: currentUser.uid,
      movie_rating: movie_rating,
      movie_poster: Poster,
      movie_name: Title,
      movie_year: Year,
      imdb_id: imdbID
    };
    const response = await axios.post(`${BASE_URL}/addallmoviedetails`, data);
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movie_id) => {
    const response = await axios.delete(`${BASE_URL}/delete/${movie_id}`);
    console.log(`Response: `, response)
    console.log("Movie deleted successfully:", movie_id);
    return response.data
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ personal_review, date_watched, movie_rating, movie_id }) => {
    const data = {
      personal_review: personal_review,
      date_watched: date_watched,
      movie_rating: movie_rating,
    };
    const response = await axios.put(`${BASE_URL}/movies/${movie_id}`, data);
    console.log(`Response from update: `, response)
    console.log("Movie updated successfully:", movie_id);
    return response.data;
  }
);


const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies2: [], loading: true }, //2 key values pairs during the initial state. An empty array, and a boolean value
  reducers: {},
  extraReducers: (builder) => { //When doing async thunk, u need extraReducers(builder)
    builder.addCase(fetchMoviesByUser.fulfilled, (state, action) => {//When data has been receive. It will be fulfilled and....
      const payload1 = action.payload
      console.log('Payload1: ', payload1)
      state.movies2 = payload1 //1. append the new data to the empty array movies2: []
      console.log(action.payload)
      state.loading = false; //2. change the boolean value to from TRUE to FALSE
    })
    builder.addCase(saveMovie.fulfilled, (state, action) => {
      state.movies2 = [action.payload, ...state.movies2] //updates the state.movies2 value 
    })
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      // Logic to remove the deleted movie from state

      console.log(`This is action.payload from delete: `, action.payload)
      const deletedMovieId = action.payload.idReplit
      state.movies2 = state.movies2.filter(banana => banana.movie_id !== deletedMovieId);
    });
    builder.addCase(updateMovie.fulfilled, (state, action) => {
      const updatedMovie = action.payload.newData;
      console.log('This is updatedMovie Action PAYLOAD:', updatedMovie)
      console.log(state.movies2)
      const index = state.movies2.findIndex((movie) => movie.movie_id === updatedMovie.movie_id);
      if (index !== -1) {
        state.movies2[index] = updatedMovie
      }
    });
  }
})

export default moviesSlice.reducer;