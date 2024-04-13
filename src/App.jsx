//App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { SearchProvider } from "./components/SearchProvider"; // Import SearchProvider
import AuthHome from "./pages/AuthHome";
import Home from "./pages/Home";
import MovieLists from "./pages/MovieLists";
import Navigation from "./components/Navigation";
import MovieDetails from "./pages/MovieDetails"
/* import { MovieDataProvider } from "./components/MovieData"; */


export default function App() {
  return (
    <AuthProvider>
      {/*       <MovieDataProvider> */}
      <SearchProvider> {/* Wrap your entire application with SearchProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route path="/movielists" element={<MovieLists />} />
              <Route path="/home" element={<Home />} />
              <Route path="/moviedetails/:id" element={<MovieDetails />} />
            </Route>
            <Route path="/login" element={<AuthHome />} />
            <Route path="*" element={<AuthHome />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
      {/*       </MovieDataProvider> */}

    </AuthProvider>
  );
}
