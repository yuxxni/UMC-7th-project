import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  margin-top: 5px;

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
  text-decoration: none;
`;

const MovieCard = ({ movie }) => {
  // 포스터 이미지가 없을 경우 기본 이미지로 설정
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/path/to/default-image.jpg'; // 기본 이미지 경로를 지정해주세요

  return (
    <MovieItem>
      <StyledLink to={`/movies/${movie.id}`}>
        <Poster src={posterUrl} alt={movie.title} />
        <TextWrapper>
          <h2>{movie.title}</h2>
          <p>개봉일: {movie.release_date}</p>
        </TextWrapper>
      </StyledLink>
    </MovieItem>
  );
};

export default MovieCard;
