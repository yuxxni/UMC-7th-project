import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
  padding: 10px 20px; 
  font-size: 14px;     
  background-color: white;
  color: gray;         
  border: 1px solid gray;
  border-radius: 5px;  
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;  
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #c0c0c0; // 비활성화 시 색상
    cursor: not-allowed;
  }
`;

const Button = ({ children, disabled, onClick }) => {
  return (
    <StyledButton type="submit" disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

