import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton'; // 스켈레톤 컴포넌트 추가
import MovieCard from '../components/MovieCard'; // 영화 카드 컴포넌트 추가

// 스타일 컴포넌트
const HashtagContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Hashtag = styled.button`
  background: none;
  border: 1px solid #fff;
  color: #fff;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    background-color: rgba(243, 47, 95, 0.5);
  }
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
  margin-top: 20px;
`;

const Purchase = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28); // 기본 장르는 액션
  const [page, setPage] = useState(1);

  // 영화 데이터 불러오기
  const fetchMovies = async (genreId, page) => {
    const apiKey = import.meta.env.VITE_TMDB_TOKEN; // 환경 변수에서 API 키 불러오기
    const apiUrl = import.meta.env.VITE_MOVIE_API_URL; // API URL

    if (!apiKey || !apiUrl) {
      console.error('API 키 또는 URL이 설정되지 않았습니다.');
      return;
    }

    try {
      const genreQuery = genreId ? `&with_genres=${genreId}` : '';
      const response = await axios.get(
        `${apiUrl}/discover/movie?language=ko-KR${genreQuery}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Bearer Token으로 인증
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('영화 불러오기 실패:', error);
    }
  };

  // 장르가 선택되면 해당 장르의 영화들만 불러오기
  useEffect(() => {
    fetchMovies(selectedGenre, page);
  }, [selectedGenre, page]);

  return (
    <div>
      {/* 장르 선택 해시태그 */}
      <HashtagContainer>
        <Hashtag onClick={() => setSelectedGenre(28)}>#액션</Hashtag>
        <Hashtag onClick={() => setSelectedGenre(35)}>#코미디</Hashtag>
        <Hashtag onClick={() => setSelectedGenre(18)}>#드라마</Hashtag>
        <Hashtag onClick={() => setSelectedGenre(27)}>#공포</Hashtag>
      </HashtagContainer>

      {/* 영화 목록 */}
      {movies.length === 0 ? (
        <CardListSkeleton number={20} />
      ) : (
        <MovieList>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              linkPath={`/purchase/${movie.id}`} // linkPath로 상세 페이지 연결
            />
          ))}
        </MovieList>
      )}

      {/* 페이지 네비게이션 */}
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
          disabled={movies.length === 0}
          style={styles.paginationButton}
        >
          다음
        </button>
      </div>
    </div>
  );
};

// 페이지 스타일링
const styles = {
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

export default Purchase;

