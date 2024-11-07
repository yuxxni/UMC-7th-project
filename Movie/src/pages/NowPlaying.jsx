import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch'; 
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; // MovieCard import

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const NowPlaying = () => {
  const { data: responseData, isLoading, isError } = useCustomFetch('/movie/now_playing?language=ko-KR&page=1');

  if (isLoading) {
    return <div style={{ color: 'white' }}>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러 중입니다...</div>;
  }

  const movies = responseData?.results || [];

  return (
    <div>
      <h1>현재 상영중인 영화</h1>
      <MovieGrid>
        {Array.isArray(movies) && movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> 
        ))}
      </MovieGrid>
    </div>
  );
};

export default NowPlaying;
