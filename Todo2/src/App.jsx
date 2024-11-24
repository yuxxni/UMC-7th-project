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
        <div>
          <h1>⚡ UMC ToDoList ⚡</h1>
          <Routes>
            <Route path="/" element={<TodoList />} /> 
            <Route path="/todo/:id" element={<TodoDetail />} /> 
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


