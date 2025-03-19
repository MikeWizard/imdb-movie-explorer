import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <div className="no-results">No movies found</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList; 