import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query'; // useMutation import 추가
import { validateLogin } from '../utils/validate'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// AccessToken이 만료되었을 때 refreshToken을 통해 새로운 AccessToken을 요청하기
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/token/access', null, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('토큰 재발급 실패:', err);
        }
      }
    }

    return Promise.reject(error);
  }
);

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

const loginApi = async (data) => {
  const response = await axiosInstance.post('/auth/login', {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // useMutation으로 로그인 요청 처리
  const { mutateAsync: loginMutation, isLoading } = useMutation(loginApi, {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });

  const onSubmit = async (data) => {
    const validationErrors = validateLogin(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((field) => {
        setError(field, { message: validationErrors[field] });
      });
      return;
    }

    try {
      await loginMutation(data); // 로그인 요청
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    try {
      await axiosInstance.post('/auth/logout');
      console.log('로그아웃 성공');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      navigate('/login');
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

        <Button type="submit" disabled={!!errors.email || !!errors.password || isLoading}>
          로그인
        </Button>
      </form>
      <Button onClick={logout}>로그아웃</Button>
    </LoginContainer>
  );
};

export default Login;
