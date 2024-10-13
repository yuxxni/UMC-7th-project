import React from 'react';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  background-color: #131416;
  min-height: calc(100vh - 50px); 
  color: white;  
`;

const SignUp = () => {
  return (
    <SignUpContainer>
    
      <h1>회원가입 페이지</h1>
    
      </SignUpContainer>
  );
};

export default SignUp;