
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TodoContextProvider } from './context/TodoContext.jsx'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodoContextProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </TodoContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
