import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthHome from "./pages/AuthHome";
import Home from "./pages/Home";
import MovieLists from "./pages/MovieLists"
import { AuthProvider } from "./components/AuthProvider"
import Navigation from "./components/Navigation";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="/movielists" element={<MovieLists />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<AuthHome />} />
          <Route path="*" element={< AuthHome />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}