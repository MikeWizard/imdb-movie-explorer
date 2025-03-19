import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieList from '../MovieList';

// Mock the MovieCard component
jest.mock('../MovieCard', () => {
  return function MockMovieCard({ movie }) {
    return <div data-testid="movie-card">{movie.title}</div>;
  };
});

describe('MovieList Component', () => {
  const mockMovies = [
    { 
      title: 'Test Movie 1', 
      year: '2020',
      director: 'Test Director',
      genre: 'Action',
      rating: '7.5'
    },
    { 
      title: 'Test Movie 2', 
      year: '2019',
      director: 'Another Director',
      genre: 'Drama',
      rating: '8.0'
    },
    { 
      title: 'Test Movie 3', 
      year: '2021',
      director: 'Third Director',
      genre: 'Comedy',
      rating: '6.5'
    }
  ];

  test('renders a list of movie cards', () => {
    render(<MovieList movies={mockMovies} />);
    
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(3);
    
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 3')).toBeInTheDocument();
  });

  test('renders no results message when movies array is empty', () => {
    render(<MovieList movies={[]} />);
    
    expect(screen.getByText('No movies found')).toBeInTheDocument();
    
    const movieCards = screen.queryAllByTestId('movie-card');
    expect(movieCards).toHaveLength(0);
  });
}); 