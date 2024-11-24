import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodoById, updateTodo, deleteTodo } from '../apis/todo'; // 필요한 함수들
import styled from 'styled-components';
import Input from './Input'; 

const TodoDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // Todo 데이터 가져오기
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const fetchedTodo = await getTodoById(id);
        setTodo(fetchedTodo);
        setTitle(fetchedTodo.title);
        setContent(fetchedTodo.content);
        setLoading(false); 
      } catch (error) {
        setError('Todo 조회 중 오류 발생');
        setLoading(false); // 데이터 로딩 완료 (에러 발생)
      }
    };

    fetchTodo();
  }, [id]);


  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedTodo = { title, content };
      await updateTodo(id, updatedTodo);
      setTodo(updatedTodo);
      setIsEditMode(false); 
    } catch (error) {
      console.error('수정 실패:', error.message);
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      navigate('/'); 
    } catch (error) {
      console.error('삭제 실패:', error.message);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <p>로딩 중...</p>
      </LoadingContainer>
    ); // 로딩 상태일 때 스피너와 메시지 표시
  }

  if (error) {
    return (
      <ErrorMessage>
        <ErrorImage src="https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716_640.png" alt="Error" />
        <p>{error}</p>
      </ErrorMessage>
    ); // 에러 발생 시 이미지와 메시지 출력
  }

  return (
    <TodoDetailContainer>
      <Title>Todo 상세 페이지</Title> 
      {isEditMode ? (
        <div>
          <p>ID: {todo.id}</p> 
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonContainer>
            <button onClick={handleUpdate}>수정하기</button>
            <button onClick={() => setIsEditMode(false)}>취소</button>
          </ButtonContainer>
        </div>
      ) : (
        <div>
          <p>ID: {todo.id}</p> 
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <p>{todo.createdAt}</p> 
          <p>{todo.status}</p> 
          <ButtonContainer>
            <button onClick={handleEditClick}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </ButtonContainer>
        </div>
      )}
    </TodoDetailContainer>
  );
};

const TodoDetailContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center; 
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    background-color: #EFEFEF;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;

    &:hover {
      background-color: #dcdcdc;
    }
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 20px;
  color: #888;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; 
  border-top: 4px solid #3498db; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorImage = styled.img`
  max-width: 200px;
  margin-bottom: 20px;
`;

export default TodoDetail;






