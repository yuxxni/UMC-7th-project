import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Search from "./pages/search";
import Categories from "./pages/categories";
import NowPlaying from "./pages/NowPlaying";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import NotFound from "./pages/NotFound";
import RootLayout from "./layout/root-layout";
import './App.css'; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,  
    children: [
      { path: "", element: <Home /> },  
      { path: "movies", element: <Movies /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "search", element: <Search /> },
      { path: "categories", element: <Categories /> },
      { path: "movies/now-playing", element: <NowPlaying /> }, 
      { path: "movies/popular", element: <Popular /> }, 
      { path: "movies/toprated", element: <TopRated /> }, 
      { path: "movies/upcoming", element: <Upcoming /> }, 
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


