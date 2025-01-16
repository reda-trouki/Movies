import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { getMovies } from '@/utils/getMovies';
import { Link } from 'expo-router';

const URL = "https://api.themoviedb.org/3/movie/now_playing"

export default function NewShowing() {
    const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        getMovies(5, URL).then((data) => {
            setMovies(data);
        });
    },[])
    return (
    <View style={styles.container}>
        <View style={{width: '100%',padding:10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Now Showing</Text>
            <Link href={'/movies/upComing'} asChild>
                <Pressable style={{ borderWidth: 1, borderColor: 'gray', paddingVertical: 4, paddingHorizontal: 6, borderRadius: 50 }}>
                    <Text style={{ fontSize: 12, color: 'gray' }} >See more</Text>
                </Pressable>
            </Link>
        </View>
        {movies &&
        <FlatList
          horizontal
          data={movies}
          keyExtractor={(item) => item?.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.movie}>
                  <View style={styles.imgcontainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }} style={styles.movieImg} />
                  </View>
                  <Text style={styles.movieTitle}>{item?.title}</Text>
                  <View style={styles.movieRating}>
                    <Ionicons name='star' size={14} color={'gold'} />
                        <Text style={{ fontSize: 12, color: 'gray' }}>{item?.vote_average}/10 IMDB</Text>
                    </View>
              </View>
          )}
        />
    }
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    movie: {
        width:200,
        marginHorizontal: 10,
    },
    imgcontainer:{
        width: '100%',
        height: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Shadow property for Android
        elevation: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    movieImg:{
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    movieTitle:{
        fontSize: 16,
        fontWeight: 'condensedBold',
        marginTop: 5,
    },
    movieRating:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:2,
        marginTop: 5,
    }
})