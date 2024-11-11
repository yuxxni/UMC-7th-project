import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch'; 
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; 
import CardListSkeleton from '../components/Skeleton/card-list-skeleton'; // 스켈레톤 UI 추가

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const Upcoming = () => {
  const { data, isLoading, isError } = useCustomFetch('/movie/upcoming?language=ko-KR&page=1');
  
  if (isLoading) {
    // 로딩 중일 때 스켈레톤 UI 표시
    return <CardListSkeleton number={20} />;  
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러 중입니다...</div>;
  }

  const movies = data?.results || []; 

  return (
    <div>
      <h1>개봉 예정인 영화</h1>
      <MovieGrid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> // MovieCard 재사용
        ))}
      </MovieGrid>
    </div>
  );
};

export default Upcoming;

