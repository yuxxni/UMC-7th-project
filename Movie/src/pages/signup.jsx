import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/use-form'; 
import { validateSignup } from '../utils/validate'; 
import axios from 'axios';


const SignUpContainer = styled.div`
  background-color: #131416;
  min-height: calc(100vh - 50px);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;


const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => (props.isError ? 'red' : '#ddd')};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
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
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  font-size: 14px;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getTextInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    validate: validateSignup, 
  });

  const isButtonEnabled = !Object.keys(errors).length && Object.keys(touched).length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    await axios.post("http://localhost:3000/auth/register", {
        email: values.email,
        password: values.password,
        passwordCheck: values.passwordCheck,
      });

     
        navigate('/login');
    
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <SignUpContainer>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...getTextInputProps('email')}
          isError={!!errors.email}
        />
        <ErrorText visible={!!errors.email}>{errors.email}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...getTextInputProps('password')}
          isError={!!errors.password}
        />
        <ErrorText visible={!!errors.password}>{errors.password}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...getTextInputProps('passwordCheck')}
          isError={!!errors.passwordCheck}
        />
        <ErrorText visible={!!errors.passwordCheck}>{errors.passwordCheck}</ErrorText>

        <Button type="submit" disabled={!isButtonEnabled}>회원가입</Button>
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;
