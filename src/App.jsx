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
/* import { FavouriteMovieData } from "./components/FavouriteMovieData"; */


export default function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        {/*         <FavouriteMovieData> */}
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/movielists" element={<MovieLists />} />
                <Route path="/home" element={<Home />} />
                <Route path="/moviedetails/:id" element={<MovieDetails />} />
              </Route>
              <Route path="/login" element={<AuthHome />} />
              <Route path="*" element={<AuthHome />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
        {/*         </FavouriteMovieData> */}

      </AuthProvider>
    </Provider>

  );
}
