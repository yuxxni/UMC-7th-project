import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetInfiniteMovies } from '../hooks/queries/useGetInfiniteMovies';
import MovieCard from '../components/MovieCard';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const NowPlaying = () => {
  const { data, 
         isLoading, 
         isFetching, 
         hasNextPage, 
         fetchNextPage, 
         isError, 
         error } = useGetInfiniteMovies('now_playing');
  
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

  return (
    <>
    <h1>현재 상영 중인 영화</h1>
      <MovieGrid>
        {data?.pages
          ?.map((page) => page.results)
          ?.flat()
          ?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}

        {isFetching && <CardListSkeleton number={20} />}
      </MovieGrid>

      <div ref={ref} style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
        {isFetching && <ClipLoader color={'#fff'} />}
      </div>
    </>
  );
};

export default NowPlaying;







// Mission 1 
/* import React from 'react';
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

export default NowPlaying; */