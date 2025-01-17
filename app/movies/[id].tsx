import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, StatusBar, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getMovies } from '@/utils/getMovies';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';

const URL = 'https://api.themoviedb.org/3/movie';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch a single movie by its ID
        const data = await getMovies(1, `${URL}/${id}`);
        if (data) {
          setMovie(data); // Since getMovies returns an array, take the first item
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>No movie data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" // Use light content for better visibility on dark backgrounds
        translucent // Make the StatusBar translucent
        backgroundColor="transparent" // Set the background to transparent
      />
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      >
        <View style={styles.header}>
          <BackButton />
          <Pressable style={{width: 50}}>
            <Ionicons name='heart' color={'white'} size={50} />
          </Pressable>
        </View>
        <View style={styles.playButtonContainer}>
          <Ionicons name="play-circle" color="rgba(255,255,255,0.7)" size={100} />
        </View>
      </ImageBackground>
      <View style={styles.mainContent}>
        <Text>{id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set a background color for the container
  },
  backgroundImage: {
    height: 300, // Fixed height for the image background
    paddingTop: StatusBar.currentHeight, // Add padding to account for the StatusBar
  },
  header: {
    width: '100%', // Ensure the container takes full width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playButtonContainer: {
    flex: 0.5, // Take up remaining space
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20, // Adjust this value to overlap the ImageBackground
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});