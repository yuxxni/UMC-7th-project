import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoList from './components/TodoList'; 
import TodoDetail from './components/TodoDetail'; 

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>⚡ UMC ToDoList ⚡</h1>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


