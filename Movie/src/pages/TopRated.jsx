import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch'; 
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; 
import CardListSkeleton from '../components/Skeleton/card-list-skeleton'; // 스켈레톤 UI 

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const TopRated = () => {
  const { data, isLoading, isError } = useCustomFetch('/movie/top_rated?language=ko-KR&page=1');
  
  if (isLoading) {
   
    return <CardListSkeleton number={20} />;  
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러 중입니다...</div>;
  }

  const movies = data?.results || []; 

  return (
    <div>
      <h1>높은 평가를 받은 영화</h1>
      <MovieGrid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> // MovieCard 재사용
        ))}
      </MovieGrid>
    </div>
  );
};

export default TopRated;
