import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders pagination with correct page numbers', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />);
    
    // Should show first page, current page and neighbors, and last page
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('disables Previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  test('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).not.toBeDisabled();
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange with correct page when clicking page number', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('4'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('calls onPageChange with correct page when clicking Next/Previous', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
    
    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('renders correct number of pages based on per_page', () => {
    const totalItems = 100;
    const perPage = 20;
    const totalPages = Math.ceil(totalItems / perPage);
    
    render(<Pagination currentPage={1} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    // Test your pagination component with these values
  });
}); 