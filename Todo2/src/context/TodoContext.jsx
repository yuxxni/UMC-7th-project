// src/context/TodoContext.jsx

import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);

  // fetchData를 직접 사용하여 API 호출
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(`http://localhost:3000${url}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
      if (!response.ok) {
        throw new Error('네트워크 응답에 문제가 있습니다.');
      }
      return await response.json();
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = await fetchData('/todo', {
        method: 'POST',
        body: JSON.stringify({ task: text }),
      });
      setTodos([...todos, newTodo]);
      setText('');
    } catch (error) {
      console.error('할 일 추가 실패:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetchData(`/todo/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('할 일 삭제 실패:', error);
    }
  };

  const updateTodo = async (id, updatedText) => {
    try {
      const updatedTodo = await fetchData(`/todo/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ task: updatedText }),
      });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      setEditingId(null);
    } catch (error) {
      console.error('할 일 수정 실패:', error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        text,
        setText,
        editText,
        setEditText,
        editingId,
        setEditingId,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
