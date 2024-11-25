// Subscriptions.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance'; 
import MovieCard from '../components/MovieCard'; 
import CardListSkeleton from '../components/Skeleton/card-list-skeleton'; 

const fetchTrendingMovies = async (timeWindow, page) => {
  const { data } = await axiosInstance.get(`/trending/all/${timeWindow}?language=ko-KR&page=${page}`);
  return data;
};

function Subscriptions() {
  const [page, setPage] = useState(1);
  const [timeWindow, setTimeWindow] = useState('day'); 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trendingMovies', timeWindow, page],
    queryFn: () => fetchTrendingMovies(timeWindow, page),
    keepPreviousData: true,
  });

  return (
    <div>
      <h1>Trending Movies</h1>

      {isLoading ? (
        <CardListSkeleton number={20} />
      ) : isError ? (
        <div>Error loading movies: {error.message}</div>
      ) : (
        <div style={styles.movieContainer}>
          {data?.results?.map((movie) => (
            <div key={movie.id} style={styles.movieItem}>
              <MovieCard
                movie={movie}
                linkPath={`/subscriptions/${movie.id}`} 
              />
            </div>
          ))}
        </div>
      )}

      <div style={styles.paginationContainer}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          style={styles.paginationButton}
        >
          이전
        </button>
        <span style={styles.pageNumber}>{page} Page</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isLoading || !data?.total_pages || page >= data.total_pages}
          style={styles.paginationButton}
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
  movieItem: {
    textAlign: 'center',
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

export default Subscriptions;

