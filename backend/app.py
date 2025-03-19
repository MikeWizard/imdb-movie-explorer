import csv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import (
    DEFAULT_PER_PAGE, MAX_PER_PAGE, CSV_FILE_PATH,
    DEBUG, HOST, PORT, CORS_ENABLED,
    MOVIES_ENDPOINT, HEALTH_ENDPOINT
)

app = Flask(__name__)
if CORS_ENABLED:
    CORS(app)  # This allows all requests from any origin

# Path to CSV file
CSV_FILE = os.path.join(os.path.dirname(__file__), CSV_FILE_PATH)

# Global variable to store movies
MOVIES = []

def load_movies():
    """Loads movies from the CSV file"""
    movies = []
    try:
        print(f"Attempting to open file: {CSV_FILE}")
        print(f"Does file exist? {os.path.exists(CSV_FILE)}")
        
        if not os.path.exists(CSV_FILE):
            print(f"Current directory: {os.getcwd()}")
            print(f"Directory contents: {os.listdir(os.path.dirname(__file__))}")
            return []
            
        # Try with latin-1 encoding (more permissive)
        with open(CSV_FILE, 'r', encoding='latin-1') as file:
            print("File opened successfully with latin-1 encoding")
            csv_reader = csv.DictReader(file)
            print(f"CSV headers: {csv_reader.fieldnames}")
            
            for i, row in enumerate(csv_reader):
                # Map CSV columns to properties expected by the frontend
                movie = {
                    'title': row.get('title', ''),
                    'year': row.get('year', ''),
                    'director': row.get('director', ''),
                    'genre': row.get('genre', ''),
                    'rating': row.get('avg_vote', ''),
                    'description': row.get('description', ''),
                    'duration': row.get('duration', ''),
                    'country': row.get('country', ''),
                    'language': row.get('language', '')
                }
                
                if i < 5:  # Print only the first 5 rows for debugging
                    print(f"Row {i} original: {row}")
                    print(f"Row {i} mapped: {movie}")
                
                movies.append(movie)
                
            print(f"Total movies loaded: {len(movies)}")
        return movies
    except Exception as e:
        print(f"Error loading CSV file: {e}")
        import traceback
        traceback.print_exc()
        return []

# Load movies when the application starts
print("Loading movies at application startup...")
MOVIES = load_movies()
print(f"Loaded {len(MOVIES)} movies into memory")

@app.route(MOVIES_ENDPOINT, methods=['GET'])
def get_movies():
    """Endpoint to get all movies or filter by title"""
    # Use movies already loaded in memory
    movies = MOVIES
    
    # Filter by title if the parameter is provided
    title_query = request.args.get('title', '').lower()
    if title_query:
        print(f"Filtering movies by title: {title_query}")
        movies = [movie for movie in movies if title_query in movie.get('title', '').lower()]
        print(f"Found {len(movies)} movies after filtering")
    
    # Get query parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', DEFAULT_PER_PAGE, type=int)
    
    # Limit per_page to prevent performance issues
    per_page = min(per_page, MAX_PER_PAGE)
    
    # Calculate start and end indices
    start = (page - 1) * per_page
    end = start + per_page
    
    # Prepare paginated response
    paginated_movies = movies[start:end]
    total = len(movies)
    
    response = {
        'movies': paginated_movies,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': total,
            'pages': (total + per_page - 1) // per_page
        }
    }
    
    return jsonify(response)

@app.route(HEALTH_ENDPOINT, methods=['GET'])
def health_check():
    """Endpoint to verify that the API is working"""
    return jsonify({"status": "ok", "movies_loaded": len(MOVIES)})

if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT) 