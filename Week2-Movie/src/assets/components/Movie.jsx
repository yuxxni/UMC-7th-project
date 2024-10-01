import React from 'react';

function Movie({ movie }) {
  return (
    <div className='movieItem'>
      <img 
        src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} 
        alt='영화포스터'
        className='moviePoster'
      />
    </div>
  );
}

export default Movie;
