import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { validateLogin } from '../utils/validate'; 

const LoginContainer = styled.div`
  background-color: #131416;
  min-height: calc(100vh - 50px);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => (props.isError ? 'red' : '#ddd')};
  border-radius: 4px;
  width: 400px;
  height: 50px;
  box-sizing: border-box;
  transition: border 0.3s;
  display: block;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: -8px 0 8px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.disabled ? 'gray' : '#F32F5F')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 400px;
  height: 50px;
  display: block;
  margin-top: 20px;
`;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {

    const validationErrors = validateLogin(data);
    if (Object.keys(validationErrors).length > 0) {
      
      Object.keys(validationErrors).forEach((field) => {
        setError(field, { message: validationErrors[field] });
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: data.email,
        password: data.password,
      });
      console.log('로그인 성공:', response.data);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <LoginContainer>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register('email')}
          isError={!!errors.email}
        />
        <ErrorText visible={!!errors.email}>{errors.email?.message}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register('password')}
          isError={!!errors.password}
        />
        <ErrorText visible={!!errors.password}>{errors.password?.message}</ErrorText>

        <Button type="submit" disabled={!!errors.email || !!errors.password}>
          로그인
        </Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
