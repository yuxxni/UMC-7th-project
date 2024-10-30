import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모의 넓이를 다 차지하도록 */
  max-width: 400px; /* 최대 넓이 설정 */
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => (props.isError ? 'red' : '#ddd')};
  border-radius: 4px;
  width: 80%; /* 가로 폭 설정 */
  box-sizing: border-box;
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
  margin-top: 10px; /* 버튼과 입력 필드 간의 간격 설정 */
`;

const validationSchema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일은 필수 입력입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(16, '비밀번호는 16자리 이하여야 합니다.')
    .required('비밀번호는 필수 입력입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력입니다.')
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur', // 입력 필드에서 포커스가 잃어버릴 때 유효성 검사를 수행
  });

  const onSubmit = (data) => {
    console.log(data); // 여기서 데이터 처리 로직을 추가할 수 있습니다.
  };

  return (
    <SignUpContainer>
      <h1>회원가입 페이지</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register('email')}
          isError={!!errors.email}
        />
        <ErrorText visible={!!errors.email}>{errors.email?.message}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register('password')}
          isError={!!errors.password}
        />
        <ErrorText visible={!!errors.password}>{errors.password?.message}</ErrorText>

        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register('passwordCheck')}
          isError={!!errors.passwordCheck}
        />
        <ErrorText visible={!!errors.passwordCheck}>{errors.passwordCheck?.message}</ErrorText>

        <Button type="submit">회원가입</Button>
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;

