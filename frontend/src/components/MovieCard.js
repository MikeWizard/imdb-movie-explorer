import React, { useState } from 'react';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevent the card click from triggering when clicking the button
    setExpanded(!expanded);
  };

  // Create a short preview of the description
  const getDescriptionPreview = (description) => {
    if (!description) return '';
    return description.length > 40 
      ? `${description.substring(0, 40)}...` 
      : description;
  };

  return (
    <div className="movie-card">
      <h2 className="movie-title">{movie.title}</h2>
      <div className="movie-info">
        <p><strong>Year:</strong> {movie.year}</p>
        {movie.rating && <p><strong>Rating:</strong> {movie.rating}</p>}
        {!expanded && movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
        
        {/* Show these only when expanded */}
        {expanded && (
          <>
            {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
            {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
            {movie.duration && <p><strong>Duration:</strong> {movie.duration} min</p>}
            {movie.country && <p><strong>Country:</strong> {movie.country}</p>}
            {movie.language && <p><strong>Language:</strong> {movie.language}</p>}
          </>
        )}
      </div>
      
      {/* Show description preview when not expanded */}
      {!expanded && movie.description && (
        <div className="movie-description preview" data-testid="movie-description">
          {getDescriptionPreview(movie.description)}
        </div>
      )}
      
      {/* Show full description when expanded */}
      {expanded && movie.description && (
        <div className="movie-description expanded" data-testid="movie-description-expanded">
          {movie.description}
        </div>
      )}
      
      <div className="movie-card-footer">
        <button className="expand-button" onClick={toggleExpand}>
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard; 