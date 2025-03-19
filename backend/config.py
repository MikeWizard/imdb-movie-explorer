# Configuration settings
DEFAULT_PER_PAGE = 12
MAX_PER_PAGE = 100
CSV_FILE_NAME = 'IMDb movies.csv'
CSV_FILE_PATH = "" + CSV_FILE_NAME  # Here you can change the path to the CSV file

# Flask server configuration
DEBUG = True
HOST = '127.0.0.1'
PORT = 5000

# CORS configuration
CORS_ENABLED = True
CORS_ORIGINS = '*'  # Allow all origins, or specify as ['http://localhost:3000']

# API endpoints
MOVIES_ENDPOINT = '/movies'
HEALTH_ENDPOINT = '/health'
