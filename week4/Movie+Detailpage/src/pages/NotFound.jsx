import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  background-color: #131416;
  min-height: calc(100vh - 50px); 
  color: white;  
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
    
      <h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>
      
      </NotFoundContainer>
  );
};


export default NotFound;