const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_AtqC5ak2YvAECkCQjOLbd6Q4bLX8EUFdbmSDEVyLwx0UqBGo7kwnipnTRQn6FCmX';

export function fetchBreeds() {
    return fetch(`${BASE_URL}breeds`,{headers: {
      'x-api-key': API_KEY
    }});
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, {
        headers: {
            'x-api-key': API_KEY
        }
    });
    
}