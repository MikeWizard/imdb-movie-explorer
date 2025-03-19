import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieListContainer from './containers/MovieListContainer';
import api from './services/api';
import './styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (page = 1, title = '') => {
    setLoading(true);
    try {
      const response = await api.get('/movies', {
        params: {
          page,
          title
        }
      });
      
      setMovies(response.data.movies);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(response.data.pagination.page);
      setError(null);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>IMDB Movie Explorer</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main className="app-content">
        {loading ? (
          <div className="loading">Loading movies...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <MovieListContainer 
            movies={movies}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Data provided by IMDB</p>
      </footer>
    </div>
  );
}

export default App; 