import React, { useEffect } from 'react';
import { useGetInfiniteMovies } from '../hooks/queries/useGetInfiniteMovies'; // useInfiniteQuery를 사용하는 커스텀 훅
import MovieCard from '../components/MovieCard';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const Popular = () => {
  const { data, 
          isLoading, 
          isFetching, 
          hasNextPage, 
          fetchNextPage, 
          isError, 
          error } = useGetInfiniteMovies('popular');
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);


  if (isLoading) {
    return (
      <MovieGrid>
        <CardListSkeleton number={20} />
      </MovieGrid>
    );
  }


  if (isError) {
    return <div style={{ color: 'white' }}>에러가 발생했습니다: {error.message}</div>;
  }

  const movies = data?.pages?.flatMap(page => page.results) || [];

  return (
    <>
      <h1>인기 있는 영화</h1>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

     
      <div ref={ref} style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        {isFetching && <ClipLoader color={'#fff'} />}
      </div>
    </>
  );
};

export default Popular;


// Mission 1
/* import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch'; 
import styled from 'styled-components';
import MovieCard from '../components/MovieCard'; 
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const Popular = () => {
  const { data, isLoading, isError } = useCustomFetch('/movie/popular?language=ko-KR&page=1');

  if (isLoading) {
    //  스켈레톤 UI 
    return <CardListSkeleton number={20} />; 
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러 중입니다...</div>;
  }

  const movies = data?.results || [];

  return (
    <div>
      <h1>인기있는 영화</h1>
      <MovieGrid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} /> 
        ))}
      </MovieGrid>
    </div>
  );
};

export default Popular;

 */