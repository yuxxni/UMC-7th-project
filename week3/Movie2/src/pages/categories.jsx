import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CategoriesContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  padding: 20px;
  background-color: #131416; 
  color: white; 
  min-height: 100vh;
`;

const CategoriesTitle = styled.h1`
  margin-bottom: 20px; 
`;

const CategoriesGrid = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-between; 
`;

const CategoryBox = styled.div`
  flex: 1 1 calc(25% - 10px); 
  margin: 5px; 
  background-color: #2c2f33; 
  position: relative; 
  height: 150px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;
const Box = styled.div`
  position: relative;
  overflow: hidden; 
  width: 100%; 
  height: 100%; 
  border-radius: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%; 
  object-fit: cover; 
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(60, 56, 56, 0.8);
  color: white;
  height: 30px;
  padding: 5px;
  text-align: left; 
  border-radius: 5px;
  font-weight: bold;
`;


const Categories = () => {
  const navigate = useNavigate(); 

  const handleNowPlayingClick = () => {
    navigate('/movies/now-playing'); // 클릭 시 현재 상영중인 영화 페이지로 이동
  };

  const handlePopularClick = () => {
    navigate('/movies/popular'); // 클릭 시 인기있는 영화 페이지로 이동
  };

  const handleTopRatedClick = () => {
    navigate('/movies/toprated'); // 클릭 시 높은 평가를 받은 페이지로 이동
  };

  const handleUpcomingClick = () => {
    navigate('/movies/upcoming'); // 클릭 시 개봉 예정중인 페이지로 이동
  };


  return (
    <CategoriesContainer>
      <CategoriesTitle>카테고리</CategoriesTitle>
      <CategoriesGrid>
        <CategoryBox  onClick={handleNowPlayingClick}>
          <Box>
            <Image src="https://cdn.sanity.io/images/poftgen7/production/a8c345921e3b64383ee01ee535a14df123f90c56-6000x4500.jpg?w=800&q=100&fit=max&auto=format&dpr=2" 
            alt="Category 1" />
            <Overlay>현재 상영중인</Overlay>
          </Box>
        </CategoryBox>
        <CategoryBox onClick={handlePopularClick}>
          <Box>
            <Image src="https://plus.unsplash.com/premium_photo-1683120778101-38b64df85ba0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Category 2" />
            <Overlay>인기있는</Overlay>
          </Box>
        </CategoryBox>
        <CategoryBox onClick={handleTopRatedClick}>
          <Box>
            <Image src="https://plus.unsplash.com/premium_photo-1667761637905-7a11ed16454f?q=80&w=2641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Category 3" />
            <Overlay>높은 평가를 받은</Overlay>
          </Box>
        </CategoryBox>
        <CategoryBox onClick={handleUpcomingClick}>
          <Box>
            <Image src="https://plus.unsplash.com/premium_photo-1681400599617-3224ea4bedfa?q=80&w=2554&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Category 4" />
            <Overlay>개봉 예정중인</Overlay>
          </Box>
        </CategoryBox>
      </CategoriesGrid>
    </CategoriesContainer>
  );
};

export default Categories;
