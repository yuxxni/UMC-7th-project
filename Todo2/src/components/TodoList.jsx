import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Link 컴포넌트 추가
import { getTodos, deleteTodo, createTodo } from '../apis/todo'; // 수정 함수 추가
import TodoForm from './TodoForm'; // TodoForm 컴포넌트 가져오기
import styled from 'styled-components';

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const TodoActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px 30px; /* 버튼 크기 키우기 */
  font-size: 16px;
  background-color: #EFEFEF; /* 버튼 색상 변경 */
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc; /* 호버 시 색상 변경 */
  }
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos(); // 전체 Todo 조회
      setTodos(data[0]); // API 응답 구조에 따라 첫 번째 배열 사용
    } catch (error) {
      console.error('할 일 목록 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 할 일 생성하기
  const handleCreate = async (todo) => {
    try {
      await createTodo(todo.title, todo.content);
      fetchTodos(); // 생성 후 목록 다시 불러오기
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  // 할 일 삭제하기
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert(`${id}번 할 일이 삭제되었습니다.`);
      fetchTodos(); // 삭제 후 목록 다시 불러오기
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // 체크박스 상태 변경하기
  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  useEffect(() => {
    fetchTodos(); 
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>할 일 목록</h1>

   
      <TodoForm onSubmit={handleCreate} /> 

      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id}>
            <div>
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleCheckboxChange(todo.id)} 
              />
            </div>
            <TodoActions>
              <Button onClick={() => handleDelete(todo.id)}>삭제</Button>
              <Button onClick={() => handleEdit(todo.id)}>수정</Button>
              <Link to={`/todo/${todo.id}`}>
                <Button>상세보기</Button>
              </Link>
            </TodoActions>
          </TodoItem>
        ))
      ) : (
        <p>등록된 할 일이 없습니다.</p>
      )}
    </div>
  );
};

export default TodoList;











 