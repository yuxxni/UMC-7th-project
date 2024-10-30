import React from 'react';
import styled from 'styled-components';
import useForm from '../hooks/use-form'; 
import * as yup from 'yup';

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
  width: 80%;
  max-width: 300px;
 box-sizing: border-box;
  transition: border 0.3s
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
  width: 80%;
  max-width: 300px;
`;


const validationSchema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(16, '비밀번호는 16자리 이하여야 합니다.')
    .required('비밀번호를 입력해주세요.')
});

const validate = (values) => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {}; 
  } catch (err) {
    return err.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }
};

const Login = () => {
  const { values, errors, touched, getTextInputProps } = useForm({
    initialValues: { email: '', password: '' },
    validate
  });

  const isButtonEnabled = !Object.keys(errors).length && Object.keys(touched).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values); 
  };

  return (
    <LoginContainer>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          {...getTextInputProps('email')}
          isError={!!errors.email}
        />
        <ErrorText visible={!!errors.email}>{errors.email}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호"
          {...getTextInputProps('password')}
          isError={!!errors.password}
        />
        <ErrorText visible={!!errors.password}>{errors.password}</ErrorText>

        <Button type="submit" disabled={!isButtonEnabled}>로그인</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
