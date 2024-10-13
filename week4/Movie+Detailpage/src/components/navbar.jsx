import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #141517;
  width: 100%;
  min-height: 50px;
`;

const LogoLink= styled(Link)`
text-decoration: none;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #F32F5F;
 
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto; 
  margin-right: 40px;
`;

const Button = styled(Link)`
  margin-left: 15px;
  padding: 8px 12px;
  background-color: ${props => props.login ? '#141517' : '#F32F5F'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none; // 링크 밑줄 제거하기
  display: inline-block;

  &:hover {
    background-color: rgba(243, 47, 95, 0.5);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoLink to= "/">
      <Logo>YONGCHA</Logo>
      </LogoLink>
      <ButtonContainer>
        
        <Button to="/login" login="true" >로그인</Button>
        <Button to="/signup">회원가입</Button>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;