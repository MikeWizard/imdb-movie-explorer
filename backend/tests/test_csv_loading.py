import sys
import os
import pytest
import tempfile
import csv

# Add parent directory to path to import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the load_movies function directly
from app import load_movies, app

class TestCSVLoading:
    
    @pytest.fixture
    def mock_csv_file(self):
        """Create a temporary CSV file with test data"""
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.csv') as temp_file:
            fieldnames = ['title', 'year', 'director', 'genre', 'avg_vote', 
                         'description', 'duration', 'country', 'language']
            writer = csv.DictWriter(temp_file, fieldnames=fieldnames)
            writer.writeheader()
            
            # Add test movies
            writer.writerow({
                'title': 'Test Movie 1',
                'year': '2020',
                'director': 'Test Director',
                'genre': 'Action',
                'avg_vote': '7.5',
                'description': 'This is a test movie description',
                'duration': '120',
                'country': 'USA',
                'language': 'English'
            })
            writer.writerow({
                'title': 'Test Movie 2',
                'year': '2019',
                'director': 'Another Director',
                'genre': 'Drama',
                'avg_vote': '8.0',
                'description': 'Another test description',
                'duration': '110',
                'country': 'UK',
                'language': 'English'
            })
            writer.writerow({
                'title': 'Test Movie 3',
                'year': '2021',
                'director': 'Third Director',
                'genre': 'Comedy',
                'avg_vote': '6.5',
                'description': 'A funny test movie',
                'duration': '95',
                'country': 'Canada',
                'language': 'English'
            })
            # Add a movie with commas and quotes to test edge cases
            writer.writerow({
                'title': 'Movie, with comma',
                'year': '2018',
                'director': 'Director, with comma',
                'genre': 'Drama, Action',
                'avg_vote': '9.0',
                'description': 'Description with "quotes"',
                'duration': '105',
                'country': 'France',
                'language': 'French'
            })
            
            temp_file_path = temp_file.name
            
        # Return the path to the temporary file
        yield temp_file_path
        
        # Clean up the temporary file after the test
        os.unlink(temp_file_path)
    
    def test_load_movies_success(self, mock_csv_file, monkeypatch):
        """Test successful loading of movies from CSV"""
        # Patch the CSV_FILE path to use our mock file
        monkeypatch.setattr('app.CSV_FILE', mock_csv_file)
        
        # Call the load_movies function
        movies = load_movies()
        
        # Verify the results
        assert len(movies) == 4
        
        # Check the first movie
        assert movies[0]['title'] == 'Test Movie 1'
        assert movies[0]['year'] == '2020'
        assert movies[0]['director'] == 'Test Director'
        assert movies[0]['genre'] == 'Action'
        assert movies[0]['rating'] == '7.5'
        assert movies[0]['description'] == 'This is a test movie description'
        assert movies[0]['duration'] == '120'
        assert movies[0]['country'] == 'USA'
        assert movies[0]['language'] == 'English'
        
        # Check the movie with commas and quotes
        comma_movie = movies[3]
        assert comma_movie['title'] == 'Movie, with comma'
        assert comma_movie['director'] == 'Director, with comma'
        assert comma_movie['genre'] == 'Drama, Action'
        assert comma_movie['description'] == 'Description with "quotes"'
    
    def test_load_movies_empty_file(self, monkeypatch, tmp_path):
        """Test loading from an empty CSV file"""
        # Create an empty CSV file
        empty_file = tmp_path / "empty.csv"
        with open(empty_file, 'w') as f:
            f.write('title,year,director,genre,avg_vote,description,duration,country,language\n')
        
        # Patch the CSV_FILE path
        monkeypatch.setattr('app.CSV_FILE', str(empty_file))
        
        # Call the load_movies function
        movies = load_movies()
        
        # Verify the results
        assert len(movies) == 0
    
    def test_load_movies_missing_file(self, monkeypatch):
        """Test handling of a missing CSV file"""
        # Set a non-existent file path
        monkeypatch.setattr('app.CSV_FILE', '/path/to/nonexistent/file.csv')
        
        # Call the load_movies function
        movies = load_movies()
        
        # Verify the results
        assert movies == []
    
    def test_load_movies_malformed_csv(self, monkeypatch, tmp_path):
        """Test handling of a malformed CSV file"""
        # Create a malformed CSV file
        malformed_file = tmp_path / "malformed.csv"
        with open(malformed_file, 'w') as f:
            f.write('title,year,director\n')  # Missing columns
            f.write('Test Movie,2020,Director\n')
        
        # Patch the CSV_FILE path
        monkeypatch.setattr('app.CSV_FILE', str(malformed_file))
        
        # Call the load_movies function
        movies = load_movies()
        
        # Verify the results - should handle missing columns gracefully
        assert len(movies) == 1
        assert movies[0]['title'] == 'Test Movie'
        assert movies[0]['year'] == '2020'
        assert movies[0]['director'] == 'Director'
        assert movies[0]['genre'] == ''  # Missing column should be empty 