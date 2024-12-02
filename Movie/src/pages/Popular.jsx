import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';
import MovieCard from '../components/MovieCard';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

// API 요청 함수
const fetchMovies = async (page) => {
  const { data } = await axiosInstance.get(`/movie/popular?language=ko-KR&page=${page}`);
  return data;
};

// Popular 컴포넌트
function Popular() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    keepPreviousData: true,
  });

  return (
    <div>
      <h1>인기 있는 영화</h1>

      {/* 로딩 상태 */}
      {isLoading ? (
        <CardListSkeleton number={20} />
      ) : isError ? (
        <div>Error loading movies: {error.message}</div>
      ) : (
        <div style={styles.movieContainer}>
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} linkPath={`/movies/${movie.id}`} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      <div style={styles.paginationContainer}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
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
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isLoading || !data?.total_pages || page >= data.total_pages}
          style={{
            ...styles.paginationButton,
            backgroundColor: isLoading || page >= data.total_pages ? 'white' : '#F32F5F',
            color: isLoading || page >= data.total_pages ? 'black' : 'white',
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