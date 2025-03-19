import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieListContainer from '../MovieListContainer';

// Mock the child components
jest.mock('../../components/MovieList', () => {
  return function MockMovieList({ movies }) {
    return (
      <div data-testid="movie-list">
        {movies.map((movie, index) => (
          <div key={index} data-testid="movie-item">{movie.title}</div>
        ))}
        {movies.length === 0 && <div>No movies found</div>}
      </div>
    );
  };
});

jest.mock('../../components/Pagination', () => {
  return function MockPagination({ currentPage, totalPages }) {
    return (
      <div data-testid="pagination">
        <button>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button>Next</button>
      </div>
    );
  };
});

describe('MovieListContainer', () => {
  test('renders MovieList with empty movies array', () => {
    render(<MovieListContainer movies={[]} currentPage={1} totalPages={0} onPageChange={() => {}} />);
    
    expect(screen.getByText('No movies found')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
  
  test('renders MovieList and Pagination when movies exist', () => {
    const mockMovies = [
      { title: 'Test Movie 1', year: '2020' },
      { title: 'Test Movie 2', year: '2021' }
    ];
    
    render(
      <MovieListContainer 
        movies={mockMovies} 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });
}); 