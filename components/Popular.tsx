import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { getMovies } from '@/utils/getMovies';
import { Link, router } from 'expo-router';

const URL = "https://api.themoviedb.org/3/movie/popular"

export default function Popular() {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies(5, URL).then((data) => {
      setMovies(data);
    });
  }, []);
  return (
    <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.title}>Popular</Text>
              <Link href={'/movies/popular'} asChild>
                <Pressable style={styles.button}>
                  <Text style={{ fontSize: 12, color: 'gray' }} >See more</Text>
                </Pressable>
              </Link>
              
          </View>
          <View>
            {/* Movie List */}
            {movies?.map((movie, index) => {
              return (
                  <View key={movie.id} style={styles.movieContainer}>
                  <Pressable onPress={()=>router.navigate(`/movies/${movie.id}`)} style={{width: '40%'}}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}} style={styles.movieImage} />
                  </Pressable>
                  <View style={{ width: '60%', gap:10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{movie.title}</Text>
                    <Text style={styles.rating}>
                      <Ionicons name='star' color={'gold'} size={16}/>
                      {movie.vote_average}/10 IMDB
                    </Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{movie.genres.map((genre, index) => <Text style={styles.genre} key={index}>{genre}</Text>)}</View>
                    <View style={{width: 100,flexDirection: 'row', justifyContent:'center', alignItems:'center', gap:4}}>
                      <Ionicons name='calendar-outline' size={16} />
                      <Text style={{ fontSize: 14, color: 'gray' }}>{movie.release_date}</Text>
                    </View>
                  </View>
                  </View>
              )
            })}
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header:{
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20
    },
    button:{
      borderWidth: 1,
      borderColor: 'gray',
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderRadius: 50
    },
    movieContainer: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    movieImage: {
      width: "80%",
      height: 150,
      borderRadius: 5,
      overflow: 'hidden',
      resizeMode: 'cover'
    },
    rating: {
      fontSize: 14,
      color: 'gray',
      gap: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    genre: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#D9EAFD',
      marginBottom: 5,
      fontSize: 8,
      color: 'gray',
      alignSelf: 'flex-start',
      marginLeft: 5,
    }
})