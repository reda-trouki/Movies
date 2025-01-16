
const TMDB_API_KEY = '3e91b6da9d348b6440a9ae7a1ac362d5';
const genreurl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`;

const fetchMovies = async (limit:number, url:string) =>{
    let movies = []
    if(limit != -1){
        await fetch(`${url}?api_key=${TMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => movies = data.results.slice(0, limit))
      .catch(error => console.error('Error:', error));
    }else{
        await fetch(`${url}?api_key=${TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => movies = data.results)
        .catch(error => console.error('Error:', error));
    }
    return movies;
}

// Step 2: Fetch genre list
const fetchGenreList = async () => {
  const response = await fetch(genreurl);
  const data = await response.json();
  return data.genres; // Returns an array of genre objects { id, name }
};

// Step 3: Map genre IDs to genre names
const getGenreNames = (genreIds:number[], genreList) => {
  return genreIds.map(id => {
    const genre = genreList.find(genre => genre.id === id);
    return genre ? genre.name : 'Unknown';
  });
};

const getMovies = async (limit:number, url:string) =>{
    const movies = await fetchMovies(limit, url);
    const genreList = await fetchGenreList();

    movies.forEach(movie => {
        const genreNames = getGenreNames(movie.genre_ids, genreList);
        movie.genres = genreNames;
    });
    return movies;
}

export { getMovies};