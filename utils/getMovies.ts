import { fetchMovieGenres, fetchTVGenres } from "./getGenres";

const TMDB_API_KEY = '';

const fetchMovies = async (limit:number, url:string) =>{
    let movies = []
    if(limit != -1){
        await fetch(`${url}?api_key=${TMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        limit != 1 ? movies = data.results.slice(0, limit): movies = data;
      })
      .catch(error => console.error('Error:', error));
    }else{
        await fetch(`${url}?api_key=${TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => movies = data.results)
        .catch(error => console.error('Error:', error));
    }
    return movies;
}



// Step 3: Map genre IDs to genre names
const getGenreNames = (genreIds:number[], genreList) => {
  return genreIds.map(id => {
    const genre = genreList.find(genre => genre.id === id);
    return genre ? genre.name : 'Unknown';
  });
};

const getMovies = async (limit:number, url:string, type: string) =>{
    const movies = await fetchMovies(limit, url);
    const genreList = type === 'tv'? await fetchTVGenres() : await fetchMovieGenres();
    if(movies.length > 0){
      movies.forEach(movie => {
        const genreNames = getGenreNames(movie.genre_ids, genreList);
        movie.genres = genreNames;
      });
    }
    return movies;
}

export { getMovies };