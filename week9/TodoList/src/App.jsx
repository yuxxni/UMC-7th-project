import React from 'react';
import { Provider } from 'react-redux'; // Provider import
import store from './redux/store'; // store import
import TodoList from './components/TodoList';
import InputTodo from './components/InputTodo';
import './App.css'; // 스타일이 적용된 파일

export default function App() {
  return (
    <Provider store={store}> {/* Provider로 스토어를 감싸줍니다 */}
      <div className="appContainer">
        <div className="todoWrapper">
          <InputTodo />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}
