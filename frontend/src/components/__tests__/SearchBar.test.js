import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    const searchButton = screen.getByText('Search');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    const form = screen.getByRole('form');
    
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    fireEvent.submit(form);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
  });

  test('calls onSearch when search button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'action' } });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('action');
  });
}); 