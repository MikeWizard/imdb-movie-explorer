import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../MovieCard';

describe('MovieCard Component', () => {
  const mockMovie = {
    title: 'Test Movie',
    year: '2020',
    director: 'Test Director',
    genre: 'Action',
    rating: '7.5',
    description: 'This is a test movie description',
    duration: '120',
    country: 'USA',
    language: 'English'
  };

  test('shows basic information by default', () => {
    render(<MovieCard movie={mockMovie} />);
    
    // Check that basic info is visible
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText(/Year:/)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    
    // Director should NOT be visible by default
    expect(screen.queryByText(/Director:/)).not.toBeInTheDocument();
    
    // Check that other expanded info is not visible
    expect(screen.queryByText(/Duration:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Country:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Language:/)).not.toBeInTheDocument();
  });

  test('expands to show more information when clicked', () => {
    render(<MovieCard movie={mockMovie} />);
    
    // Initially, expanded fields should not be visible
    expect(screen.queryByText(/Director:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Duration:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Country:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Language:/)).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(screen.getByText('Show More'));
    
    // Now all fields should be visible
    expect(screen.getByText(/Director:/)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    expect(screen.getByText(/Duration:/)).toBeInTheDocument();
    expect(screen.getByText(/Country:/)).toBeInTheDocument();
    expect(screen.getByText(/Language:/)).toBeInTheDocument();
    
    // Full description should be visible
    expect(screen.getByTestId('movie-description-expanded')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie description')).toBeInTheDocument();
  });

  test('shows a preview of the description when not expanded', () => {
    const longDescription = 'This is a very long description that should be truncated when the card is not expanded. It contains more than 40 characters.';
    const movieWithLongDesc = { ...mockMovie, description: longDescription };
    
    render(<MovieCard movie={movieWithLongDesc} />);
    
    // Should show truncated description
    const previewDesc = screen.getByTestId('movie-description');
    expect(previewDesc).toBeInTheDocument();
    expect(previewDesc.textContent).toHaveLength(43); // 40 chars + '...'
    expect(previewDesc.textContent).toEqual(longDescription.substring(0, 40) + '...');
  });

  test('toggles between expanded and collapsed states', () => {
    render(<MovieCard movie={mockMovie} />);
    
    // Initially not showing expanded content
    expect(screen.queryByText(/Director:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Duration:/)).not.toBeInTheDocument();
    
    // Expand
    fireEvent.click(screen.getByText('Show More'));
    expect(screen.getByText(/Director:/)).toBeInTheDocument();
    expect(screen.getByText(/Duration:/)).toBeInTheDocument();
    expect(screen.getByText('Show Less')).toBeInTheDocument();
    
    // Collapse again
    fireEvent.click(screen.getByText('Show Less'));
    expect(screen.queryByText(/Director:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Duration:/)).not.toBeInTheDocument();
    expect(screen.getByText('Show More')).toBeInTheDocument();
  });
}); 