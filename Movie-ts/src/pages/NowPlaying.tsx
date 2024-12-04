import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';
import MovieCard from '../components/MovieCard';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

// 영화 데이터 fetching 함수
const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get(`/movie/now_playing?language=ko-KR&page=${page}`);
  return data;
};

function NowPlaying() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery<MovieResponse, Error>({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    meta: {
      keepPreviousData: true, // react-query v5에서 meta로 설정
    },
  });

  return (
    <div>
      <h1>현재 상영중인 영화</h1>

      {/* 로딩 상태 */}
      {isLoading ? (
        <CardListSkeleton number={20} />
      ) : isError ? (
        <div>Error loading movies: {error?.message}</div>
      ) : (
        <div style={styles.movieContainer}>
          {/* data가 정의되어 있을 때만 results에 접근 */}
          {data?.results?.length ? (
            data.results.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                linkPath={`/movies/${movie.id}`}  
              />
            ))
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      )}

      {/* 페이지네이션 */}
      <div style={styles.paginationContainer}>
        <button
          onClick={() => setPage((prevPage: number) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          style={{
            ...styles.paginationButton,
            backgroundColor: page === 1 ? 'white' : '#F32F5F',
            color: page === 1 ? 'black' : 'white',
          }}
        >
          이전
        </button>
        <span style={styles.pageNumber}>{page} Page</span>
        <button
        onClick={() => setPage((prevPage: number) => prevPage + 1)}
        disabled={isLoading || !data?.total_pages || page >= (data?.total_pages ?? 0)}
        style={{
        ...styles.paginationButton,
        backgroundColor: isLoading || page >= (data?.total_pages ?? 0) ? 'white' : '#F32F5F',
        color: isLoading || page >= (data?.total_pages ?? 0) ? 'black' : 'white',
         }}
        >
          다음
        </button>

      </div>
    </div>
  );
}

const styles = {
  movieContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)', 
    gap: '40px',
  },
  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumber: {
    fontSize: '16px',
    color: 'white',
    margin: '0 10px',
  },
  paginationButton: {
    padding: '8px 16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
  },
};

export default NowPlaying;




//Mission 2
/* import React, { useEffect } from 'react';
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

const NowPlaying = () => {
  const { data, 
          isLoading, 
          isFetching, 
          hasNextPage, 
          fetchNextPage, 
          isError, 
          error } = useGetInfiniteMovies('NowPlaying');
  
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
      <h1>현재 상영 중인 영화</h1>
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

export default NowPlaying; */




// Mission 1
/* import React from 'react';
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
  const { data, isLoading, isError } = useCustomFetch('/movie/now_playing?language=ko-KR&page=1');
  
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

export default NowPlaying; */


































