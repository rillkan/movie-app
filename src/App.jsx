//App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { SearchProvider } from "./components/SearchProvider"; // Import SearchProvider
import AuthHome from "./pages/AuthHome";
import Home from "./pages/Home";
import MovieLists from "./pages/MovieLists";
import Navigation from "./components/Navigation";
import MovieDetails from "./pages/MovieDetails"
import { Provider } from "react-redux";
import store from "./store"
import ProfilePage from "./pages/ProfilePage"
import { ActualNameProvider } from "./components/ActualNameProvider";
import Diary from "./pages/Diary"
import SearchMovies from "./pages/SearchMovies";

export default function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <ActualNameProvider>
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigation />}>
                  <Route path="/profilepage" element={<ProfilePage />} />
                  <Route path="/movielists" element={<MovieLists />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/moviedetails/:id" element={<MovieDetails />} />
                  <Route path="/diary" element={<Diary />} />
                  <Route path="/searchmovies" element={<SearchMovies />} />
                </Route>
                <Route path="/login" element={<AuthHome />} />
                <Route path="*" element={<AuthHome />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </ActualNameProvider>
      </AuthProvider>
    </Provider>

  );
}
