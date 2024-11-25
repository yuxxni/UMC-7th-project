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
  text-decoration: none;
  color: inherit;
`;

const MovieCard = ({ movie, linkPath }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://screenshotlayer.com/images/assets/placeholder.png`;

  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('ko-KR')
    : '개봉일 없음';

  return (
    <StyledLink to={linkPath}> {/* linkPath를 활용 */}
      <MovieItem>
        <Poster src={posterUrl} alt={movie.title} />
        <TextWrapper>
          <h2>{movie.title}</h2>
          <p>개봉일: {formattedDate}</p>
        </TextWrapper>
      </MovieItem>
    </StyledLink>
  );
};

export default MovieCard;
