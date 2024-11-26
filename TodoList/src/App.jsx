import React from 'react';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import TodoList from './components/TodoList';
import InputTodo from './components/InputTodo';
import './App.css'; 

export default function App() {
  return (
    <Provider store={store}> 
      <div className="appContainer">
        <div className="todoWrapper">
          <InputTodo />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}
