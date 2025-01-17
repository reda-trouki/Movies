import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import Template from '@/components/template';
import { getMovies } from '@/utils/getMovies';
import Movie from '@/components/Movie';
import { Link } from 'expo-router';

const URL = "https://api.themoviedb.org/3/movie/popular"

export default function popular() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies(-1, URL).then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <Template>
      <View style={{ flex: 1, marginTop:10 }}>
        <ScrollView contentContainerStyle={styles.content}>
          {movies?.map((m) => (
            <Movie title='movies' key={m.id} id={m.id} image={m.poster_path} />
          ))}
        </ScrollView>
      </View>
    </Template>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});