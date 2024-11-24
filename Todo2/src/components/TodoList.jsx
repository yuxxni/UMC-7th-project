import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo, createTodo } from '../apis/todo';
import TodoForm from './TodoForm';
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
  padding: 15px 30px;
  font-size: 16px;
  background-color: #EFEFEF;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState(''); // 검색창 상태
  const [loading, setLoading] = useState(true);

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
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
      fetchTodos();
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  // 할 일 삭제하기
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert(`${id}번 할 일이 삭제되었습니다.`);
      fetchTodos();
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

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.includes(searchText) || todo.content.includes(searchText)
  );

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>할 일 목록</h1>
      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '100%',
          maxWidth: '500px',
          marginBottom: '20px',
        }}
      />

      {/* Todo 생성 폼 */}
      <TodoForm onSubmit={handleCreate} />

      {/* 필터링된 Todo 리스트 */}
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
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
              <Button>수정</Button>
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
