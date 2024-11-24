import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import TodoList from './components/TodoList'; 
import TodoDetail from './components/TodoDetail'; 

const App = () => {
  return (
    <Router>
      <div>
        <h1>⚡ UMC ToDoList ⚡</h1>
        <Routes>
          <Route path="/" element={<TodoList />} /> 
          <Route path="/todo/:id" element={<TodoDetail />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;

