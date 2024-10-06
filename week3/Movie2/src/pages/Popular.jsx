import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; 

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

const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {  
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGRhNDAwYTlkOGVmZDNlZDczZTYxMTU5YzRkOWIxOCIsIm5iZiI6MTcyODIxNDM5OS40NDc3NTIsInN1YiI6IjY3MDI3MWY0ZmEzZTY5ZTBlZjdkMzE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qzs88QucIhdDGCS3tH7W5v2urp-9a1OQzfvSMmzncEM`, 
            accept: 'application/json',
          },
          params: {
            language: 'ko-KR', 
            page: 1,
          },
        });
        
        const movieData = response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          releaseDate: movie.release_date,
        }));
        
        setMovies(movieData); 
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>인기 있는 영화</h1>
      <MovieGrid>
        {movies.map(movie => (
          <MovieItem key={movie.id}>
            <Poster src={movie.posterPath} alt={movie.title} />
            <TextWrapper>
              <h2>{movie.title}</h2> 
              <p>개봉일: {movie.releaseDate}</p>
            </TextWrapper>
          </MovieItem>
        ))}
      </MovieGrid>
    </div>
  );
};

export default Popular;
