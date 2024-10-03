import React from 'react';

const IMG_Base_URL = "https://image.tmdb.org/t/p/w500";

export default function Movie({poster_path}) {
     return (
        <div className= 'movie-container'>
          <img src={IMG_Base_URL + poster_path} alt="영화 포스터"/>
        </div>
     )
 }
