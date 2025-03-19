import sys
import os
import json
import pytest

# Add parent directory to path to import app and config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, MOVIES
from config import DEFAULT_PER_PAGE

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'ok'
    assert 'movies_loaded' in data

def test_get_movies(client):
    """Test the endpoint to get all movies"""
    # First, get the default per_page value from the API
    response = client.get('/movies')
    data = json.loads(response.data)
    default_per_page = data['pagination']['per_page']
    
    # Now use this value in your assertions
    assert len(data['movies']) == min(default_per_page, len(MOVIES))
    
    # Test with a custom per_page
    response = client.get('/movies?per_page=5')
    data = json.loads(response.data)
    assert data['pagination']['per_page'] == 5
    assert len(data['movies']) == 5

def test_pagination(client):
    """Test pagination functionality"""
    # Test page 2
    response = client.get('/movies?page=2')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['pagination']['page'] == 2
    
    # Test custom per_page
    response = client.get('/movies?per_page=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['pagination']['per_page'] == 5
    assert len(data['movies']) == 5
    
    # Test combination
    response = client.get('/movies?page=3&per_page=7')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['pagination']['page'] == 3
    assert data['pagination']['per_page'] == 7

def test_filter_movies_by_title(client):
    """Test filtering movies by title"""
    # Assuming there are movies with "the" in the title
    response = client.get('/movies?title=the')
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Check that all returned movies contain "the" in the title
    if data['movies']:  # Only verify if there are results
        for movie in data['movies']:
            assert 'the' in movie.get('title', '').lower()
    
    # Test pagination with filtering
    response = client.get('/movies?title=the&page=2&per_page=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['pagination']['page'] == 2
    assert data['pagination']['per_page'] == 5 