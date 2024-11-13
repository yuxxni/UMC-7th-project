import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // QueryClient와 QueryClientProvider 가져오기
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // ReactQueryDevtools 가져오기

import Movies from './pages/movies';
import Home from './pages/Home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Search from './pages/search';
import Categories from './pages/categories';
import NowPlaying from './pages/NowPlaying';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import NotFound from './pages/NotFound';
import MovieDetail from './pages/MovieDetail';
import RootLayout from './layout/root-layout';
import './App.css';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'search', element: <Search /> },
      { path: 'categories', element: <Categories /> },
      { path: 'movies/now-playing', element: <NowPlaying /> },
      { path: 'movies/popular', element: <Popular /> },
      { path: 'movies/toprated', element: <TopRated /> },
      { path: 'movies/upcoming', element: <Upcoming /> },
      { path: 'movies/:movieId', element: <MovieDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} /> 
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  );
}

export default App;












