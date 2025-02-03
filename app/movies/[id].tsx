import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, StatusBar, Pressable, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getMovies } from '@/utils/getMovies';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';
import { getCredits } from '@/utils/getCredits';
import Credit from '@/components/Credit';

const URL = 'https://api.themoviedb.org/3/movie';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [casts, setCasts] = React.useState([]);

  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch a single movie by its ID
        const data = await getMovies(1, `${URL}/${id}`, "movie");
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
    const fetchCast = async () =>{
      try {
        const data = await getCredits(`${URL}/${id}/credits`);
        setCasts(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchMovieDetails();
    fetchCast();
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
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
      >
        <View style={styles.header}>
          <BackButton />
          <Pressable style={{ width: 50 }}>
            <Ionicons name="ellipsis-horizontal" color={'white'} size={40} />
          </Pressable>
        </View>
        <View style={styles.playButtonContainer}>
          <Ionicons name="play-circle" color="rgba(255,255,255,0.7)" size={100} />
        </View>
      </ImageBackground>
      <ScrollView style={styles.mainContent}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{movie.title}</Text>
          <Ionicons name="bookmark-outline" size={30} />
        </View>
        <Text style={styles.rating}>
          <Ionicons name="star" color="gold" size={14} />
          {movie.vote_average}/10 IMDB
        </Text>
        <View style={styles.genresContainer}>
          {movie.genres.map((genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Release Date</Text>
            <Text style={styles.detailValue}>{movie.release_date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Language</Text>
            <Text style={styles.detailValue}>{movie.original_language.toUpperCase()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Budget</Text>
            <Text style={styles.detailValue}>{movie.budget}$</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>{movie.overview}</Text>
        </View>
        <View>
          <Text style={styles.descriptionLabel}>Cast</Text>
          <FlatList
            horizontal
            data={casts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Credit cast={item} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    paddingTop: StatusBar.currentHeight,
    flex: 0.5,
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
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -100,
    padding: 20,
  },
  title: {
    width:'92%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  genresContainer: {
    flexDirection: 'row', // Display genres in a row
    flexWrap: 'wrap', // Allow genres to wrap to the next line if needed
    marginVertical: 14,
  },
  genre: {
    fontSize: 10,
    marginRight: 8, // Add spacing between genres
    marginBottom: 8, // Add spacing between lines
    backgroundColor: '#D9EAFD', // Optional: Add a background color
    paddingHorizontal: 8, // Optional: Add padding for better appearance
    paddingVertical: 4, // Optional: Add padding for better appearance
    borderRadius: 10, // Optional: Add rounded corners
  },
  error: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  detailItem: {
    alignItems: 'center', // Center-align text
  },
  detailLabel: {
    fontSize: 12,
    color: '#666', // Subtle color for the label
    fontWeight: '500', // Medium weight for better readability
    marginBottom: 4, // Spacing between label and value
  },
  detailValue: {
    fontSize: 12,
    color: '#000', // Darker color for the value
    fontWeight: 'condensedBold', // Bold for emphasis
  },
    descriptionContainer: {
      marginTop: 10, // Add vertical spacing
    },
    descriptionLabel: {
      fontSize: 16,
      fontWeight: 'bold', // Bold for the label
      color: '#000', // Dark color for emphasis
      marginBottom: 8, // Spacing between label and text
    },
    descriptionText: {
      fontSize: 12,
      color: '#666', // Subtle color for the description text
      lineHeight: 20, // Improve readability with line height
      textAlign: 'justify', // Justify text for a clean look
    },
});