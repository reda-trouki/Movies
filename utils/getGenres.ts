import Constants from "expo-constants";

// utils/getMovies.js
const { tmdbKey } = Constants.expoConfig.extra;// Replace with your TMDB API key

export const fetchMovieGenres = async () => {

  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie genres');
  }
  const data = await response.json(); // Parse the JSON response
  return data.genres; // Return the genres array
};

export const fetchTVGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch TV genres');
  }
  const data = await response.json(); // Parse the JSON response
  return data.genres; // Return the genres array
};