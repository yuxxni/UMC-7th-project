import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch'; 
import styled from 'styled-components'; 
import { Link } from 'react-router-dom'; 

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`;

const MovieItem = styled.div`
  width: 200px;
  position: relative; 
  text-align: left; 
  color: white;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  margin-top: 5px; /* 포스터와 텍스트 사이의 간격 */
  
  h2 {
    font-size: 16px; 
    margin: 0;
  }

  p {
    font-size: 14px; 
    margin: 5px 0 0;
    color: white; 
  }
`;

const StyledLink = styled(Link)`
  color: white; 
  text-decoration: none; /* 밑줄 제거 */
`;

const Upcoming = () => {
  const { data, isLoading, isError } = useCustomFetch('/movie/upcoming?language=ko-KR&page=1');
  
  if (isLoading) {
    return <div style={{ color: 'white' }}>로딩 중입니다...</div>;
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
          <MovieItem key={movie.id}>
            <StyledLink to={`/movies/${movie.id}`}> 
              <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <TextWrapper>
                <h2>{movie.title}</h2> 
                <p>개봉일: {movie.release_date}</p>
              </TextWrapper>
            </StyledLink>
          </MovieItem>
        ))}
      </MovieGrid>
    </div>
  );
};

export default Upcoming;
