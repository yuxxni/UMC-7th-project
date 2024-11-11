import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import { useGetMovies } from '../hooks/queries/useGetMovies';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const NowPlaying = () => {
  const { data: responseData, isLoading, isError } = useQuery({
    queryFn: () => useGetMovies({ category: 'now_playing', pageParam: 1 }),
    queryKey: ['movies', 'now_playing'],
    cacheTime: 10000,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <MovieGrid>
        <CardListSkeleton number={20} />
      </MovieGrid>
    );
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러가 발생했습니다.</div>;
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

