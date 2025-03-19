# IMDB Movie Explorer

A React-based web application that allows users to browse and search for movies from the IMDB database.

## Features

- **Movie Browsing**: View a paginated list of movies from IMDB
- **Search Functionality**: Search for movies by title
- **Responsive Design**: Works on desktop and mobile devices
- **Pagination**: Navigate through multiple pages of movie results
- **Error Handling**: Graceful handling of API errors

## Project Structure

```
project/
├── backend/                # Python Flask API
│   ├── config.py           # Configuration settings
│   ├── app.py              # Main application file
│   ├── tests/              # Backend tests
│   └── IMDb movies.csv     # Movie dataset
├── frontend/               # React application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # UI components
│   │   ├── containers/     # Container components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   └── __tests__/      # Tests
│   └── package.json        # Dependencies and scripts
```

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Python](https://www.python.org/) (v3.8 or later)
- [pip](https://pip.pypa.io/en/stable/installation/)

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/imdb-movie-viewer.git
   cd imdb-movie-viewer
   ```

2. Create and activate a virtual environment:
   ```bash
   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate
   
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Verify the CSV file location:
   - Ensure the IMDB movie dataset CSV file is located at `backend/IMDb movies.csv`
   - If you need to use a different location, update the `CSV_FILE_PATH` in `config.py`

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

### Start the Backend Server

1. Activate the virtual environment (if not already activated):
   ```bash
   # On macOS/Linux
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

2. Start the Flask server:
   ```bash
   cd backend
   python app.py
   ```
   The backend API will be available at http://127.0.0.1:5000/

### Start the Frontend Development Server

1. In a new terminal, start the React development server:
   ```bash
   cd frontend
   npm start
   ```
   The frontend application will be available at http://localhost:3000/

## Testing

### Backend Tests

To run the backend tests:

```bash
cd backend
pytest
```

This will run all tests in the `backend/tests/` directory.

To run specific test files:

```bash
# Run API tests
python3 -m pytest tests/test_api.py
# Run CSV loading tests
python3 -m pytest tests/test_csv_loading.py
```

To run tests with coverage report:

```bash
python3 -m pytest -cov=.
```

To run tests with verbose output:

```bash
python3 -m pytest -v
```

### Frontend Tests

To run all frontend tests:

```bash
cd frontend
npm test
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

To run specific test files:

```bash
# Run component tests
npm test -- src/components/__tests__/MovieCard.test.js

# Run container tests
npm test -- src/containers/__tests__/MovieListContainer.test.js
```

## Configuration

### Backend Configuration

The backend configuration is stored in `backend/config.py`. You can modify these settings:

- `DEFAULT_PER_PAGE`: Default number of movies per page (default: 12)
- `MAX_PER_PAGE`: Maximum number of movies per page (default: 100)
- `CSV_FILE_PATH`: Path to the CSV file containing movie data
- `DEBUG`: Enable/disable debug mode
- `HOST`: Host address for the Flask server
- `PORT`: Port for the Flask server
- `CORS_ENABLED`: Enable/disable CORS
- `MOVIES_ENDPOINT`: API endpoint for movies
- `HEALTH_ENDPOINT`: API endpoint for health check

### Frontend Configuration

The frontend uses environment variables for configuration. Create a `.env` file in the `frontend` directory with these variables:

```
# API Configuration
REACT_APP_API_URL=http://127.0.0.1:5000
REACT_APP_API_TIMEOUT=10000
REACT_APP_MOVIES_PER_PAGE=12

# Feature Flags
REACT_APP_ENABLE_SEARCH=true
REACT_APP_ENABLE_PAGINATION=true

# UI Configuration
REACT_APP_APP_TITLE=IMDB Movie Explorer
```

For production deployment, you can set these variables in your hosting environment.

## API Endpoints

The backend provides the following API endpoints:

- `GET /movies` - Get a list of movies
  - Query parameters:
    - `page` (optional): Page number (default: 1)
    - `title` (optional): Filter movies by title
    - `per_page` (optional): Number of movies per page (default: 12)

- `GET /health` - Check API health
  - Returns: `{"status": "ok", "movies_loaded": <number>}`

## API Access Guide

This section provides simple instructions for accessing the API directly using cURL (command line) or Postman (GUI tool).

### Using cURL (Command Line)

cURL is a command-line tool for making HTTP requests. Here are some examples:

#### Check API Health

```bash
curl http://127.0.0.1:5000/health
```

This should return something like:
```json
{"status":"ok","movies_loaded":1000}
```

#### Get Movies (First Page)

```bash
curl http://127.0.0.1:5000/movies
```

This returns the first page of movies (default 12 per page).

#### Get a Specific Page of Movies

```bash
curl "http://127.0.0.1:5000/movies?page=2&per_page=5"
```

This returns the second page with 5 movies per page.

#### Search for Movies by Title

```bash
curl "http://127.0.0.1:5000/movies?title=star"
```

This returns movies with "star" in the title.

#### Combine Search and Pagination

```bash
curl "http://127.0.0.1:5000/movies?title=star&page=2&per_page=5"
```

This returns the second page of movies with "star" in the title, with 5 movies per page.

### Using Postman (GUI Tool)

[Postman](https://www.postman.com/downloads/) is a popular tool for testing APIs with a graphical interface.

1. **Download and Install Postman**: Visit [postman.com/downloads](https://www.postman.com/downloads/)

2. **Create a New Request**:
   - Click the "+" button to create a new request
   - Select "GET" from the dropdown (it's the default)

3. **Check API Health**:
   - Enter `http://127.0.0.1:5000/health` in the URL field
   - Click "Send"
   - You should see the response in the lower panel

4. **Get Movies**:
   - Enter `http://127.0.0.1:5000/movies` in the URL field
   - Click "Send"
   - You'll see a list of movies in the response

5. **Add Query Parameters** (for pagination or search):
   - Click on "Params" button below the URL field
   - Add key-value pairs:
     - For pagination: key=`page`, value=`2` and key=`per_page`, value=`5`
     - For search: key=`title`, value=`star`
   - Click "Send"

6. **Combine Search and Pagination**:
   - Enter `http://127.0.0.1:5000/movies` in the URL field
   - Click on "Params" button below the URL field
   - Add these key-value pairs:
     - key=`title`, value=`star`
     - key=`page`, value=`2`
     - key=`per_page`, value=`5`
   - Click "Send"
   - This will return the second page of movies with "star" in the title, with 5 movies per page



### Common Parameters

- `page`: Page number (starts at 1)
- `per_page`: Number of movies per page (default is 12)
- `title`: Search term to filter movies by title

### Response Format

The API returns JSON data in this format:

```json
{
  "movies": [
    {
      "title": "Movie Title",
      "year": "2020",
      "director": "Director Name",
      "genre": "Action",
      "rating": "7.5",
      "description": "Movie description...",
      "duration": "120",
      "country": "USA",
      "language": "English"
    },
    // More movies...
  ],
  "pagination": {
    "page": 1,
    "per_page": 12,
    "total": 1000,
    "pages": 84
  }
}
```

## Deployment

### Frontend

1. Build the production-ready frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory.

### Backend

The backend can be deployed to any Python hosting service like Heroku, PythonAnywhere, or AWS.

## License

This project is licensed under the MIT License.