// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TodoContextProvider } from './context/TodoContext.jsx';  // 경로를 확인하세요.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a new QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the app with the QueryClientProvider first */}
    <QueryClientProvider client={queryClient}>
      {/* Wrap TodoContextProvider inside QueryClientProvider */}
      <TodoContextProvider>
        <App />
        {/* Optionally include React Query Devtools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </TodoContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);