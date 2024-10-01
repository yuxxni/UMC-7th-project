import './App.css'
import {movies} from './mocks/movie.js';
import Movie from "./components/Movie.jsx";


function App() {
  return (
    <div>
      <div className="moviesContainer">
        {movies.results.map((movie) => (
          <Movie key={movie.id} movie={movie}/>
        ))}
       
      </div>
    </div>
  );
}

export default App;