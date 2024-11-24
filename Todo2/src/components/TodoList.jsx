import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo, createTodo, updateTodo } from '../apis/todo';
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
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null); // 수정할 Todo의 ID 상태 추가
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');

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

  // Todo 생성하기
  const handleCreate = async (todo) => {
    try {
      await createTodo(todo.title, todo.content);
      fetchTodos();
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  // Todo 수정하기
  const handleUpdate = async (id) => {
    try {
      const updatedData = {
        title: todoTitle,
        content: todoContent,
      };
      await updateTodo(id, updatedData); // 수정 요청
      setEditId(null); // 수정 완료 후 수정 모드 종료
      fetchTodos(); // Todo 목록 갱신
    } catch (error) {
      console.error('수정 실패:', error);
      alert('Todo 수정에 실패했습니다.');
    }
  };

  // Todo 삭제하기
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      alert(`${id}번 할 일이 삭제되었습니다.`);
      fetchTodos();
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 검색 필터
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.includes(searchText) || todo.content.includes(searchText)
  );

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>할 일 목록</h1>
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

      <TodoForm onSubmit={handleCreate} />

      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            <div>
              {editId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    placeholder="수정할 제목"
                  />
                  <textarea
                    value={todoContent}
                    onChange={(e) => setTodoContent(e.target.value)}
                    placeholder="수정할 내용"
                  />
                  <Button onClick={() => handleUpdate(todo.id)}>수정 완료</Button>
                </div>
              ) : (
                <>
                  <h2>{todo.title}</h2>
                  <p>{todo.content}</p>
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </>
              )}
            </div>
            <TodoActions>
              <Button onClick={() => handleDelete(todo.id)}>삭제</Button>
              {editId === todo.id ? (
                <Button onClick={() => setEditId(null)}>수정 취소</Button>
              ) : (
                <Button onClick={() => {
                  setEditId(todo.id);
                  setTodoTitle(todo.title);
                  setTodoContent(todo.content);
                }}>
                  수정
                </Button>
              )}
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
