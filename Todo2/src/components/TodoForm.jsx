import React, { useState } from 'react';
import styled from 'styled-components';

const TodoFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  min-height: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoForm = ({ onSubmit }) => {
  const [todoText, setTodoText] = useState('');
  const [contentText, setContentText] = useState('');

  const handleSubmit = () => {
    if (todoText.trim() === '' || contentText.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    onSubmit({
      title: todoText,
      content: contentText,
      checked: false,
    });

    setTodoText('');
    setContentText('');
  };

  return (
    <TodoFormWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Input
          type="text"
          placeholder="내용을 입력해주세요"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>Todo 생성</Button>
      </ButtonWrapper>
    </TodoFormWrapper>
  );
};

export default TodoForm;

























