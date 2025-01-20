const API_KEY = ''; // Replace with your TMDB API key

// Fetch movies by genre
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movies by genre');
    }
    const data = await response.json();
    return data.results; // Returns an array of movies
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

// Fetch TV shows by genre
export const getTVShowsByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows by genre');
    }
    const data = await response.json();
    return data.results; // Returns an array of TV shows
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    return [];
  }
};