import React from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

function MovieListContainer({ movies, currentPage, totalPages, onPageChange }) {
  return (
    <div className="movie-list-container">
      <MovieList movies={movies} />
      
      {/* Only show pagination when there are movies */}
      {movies.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}
    </div>
  );
}

export default MovieListContainer; 