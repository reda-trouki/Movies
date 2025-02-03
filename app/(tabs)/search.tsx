import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Template from '@/components/template';
import Header from '@/components/Header';
import { fetchMovieGenres, fetchTVGenres } from '@/utils/getGenres';
import { getMovies } from '@/utils/getMovies';
import Movie from '@/components/Movie';

const MOVIE_URL = 'https://api.themoviedb.org/3/discover/movie';
const TV_URL = 'https://api.themoviedb.org/3/discover/tv';

const Search = () => {
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedType, setSelectedType] = useState('movies');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [allResults, setAllResults] = useState([]); // Store all results
  const [filteredResults, setFilteredResults] = useState([]); // Store filtered results

  // Load genres based on selected type
  const loadGenres = async (type) => {
    try {
      const data = type === 'tv' ? await fetchTVGenres() : await fetchMovieGenres();
      setGenres(data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  // Load results based on selected type
  const loadResult = async (type) => {
    try {
      const url = type === 'tv' ? TV_URL : MOVIE_URL;
      const data = await getMovies(-1, url, type);
      setAllResults(data); // Store all results
      setFilteredResults(data); // Initialize filtered results with all results
    } catch (error) {
      console.error('Failed to fetch results:', error);
    }
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearch(query);
    if (query === '') {
      filterResultsByGenre(selectedGenre); // Show all results if search is empty
    } else {
      const filtered = allResults.filter((result) => {
        const title = selectedType === 'movies' ? result.title : result.name;
        return title.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredResults(filtered); // Update filtered results
    }
  };

  // Filter results by genre
  const filterResultsByGenre = (genreId) => {
    if (!genreId) {
      setFilteredResults(allResults); // Show all results if no genre is selected
    } else {
      const filtered = allResults.filter((result) =>
        result.genre_ids.includes(genreId)
      );
      setFilteredResults(filtered); // Update filtered results
    }
  };

  // Reload genres and results when selected type changes
  useEffect(() => {
    loadGenres(selectedType);
    loadResult(selectedType);
    setSelectedGenre(null); // Reset selected genre when type changes
  }, [selectedType]);

  // Handle genre selection
  const handleGenrePress = (genreId) => {
    if(selectedGenre === genreId){
      setSelectedGenre(null); // Reset selected genre when selected genre is clicked again
      filterResultsByGenre(null);
    }else{
      setSelectedGenre(genreId);
      filterResultsByGenre(genreId);
    }
  };

  // Render genre items
  const renderGenreItem = ({ item }) => (
    <Pressable
      style={[
        styles.genre,
        selectedGenre === item.id && styles.selectedGenre,
      ]}
      onPress={() => handleGenrePress(item.id)}
    >
      <Text style={styles.genreText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <Template>
      <Header title="Search" />
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={handleSearch} // Use handleSearch directly
            />
            <Ionicons name="search" size={24} color="#666" />
          </View>
          <View style={styles.typeContainer}>
            <Pressable
              style={[styles.typeButton, selectedType === 'movies' && styles.selectedTypeButton]}
              onPress={() => setSelectedType('movies')}
            >
              <Text style={styles.typeButtonText}>Movies</Text>
            </Pressable>
            <Pressable
              style={[styles.typeButton, selectedType === 'tv' && styles.selectedTypeButton]}
              onPress={() => setSelectedType('tv')}
            >
              <Text style={styles.typeButtonText}>TV Shows</Text>
            </Pressable>
          </View>
          <View style={styles.genresContainer}>
            <FlatList
              horizontal
              data={genres}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderGenreItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {filteredResults.length > 0 && (
            <ScrollView contentContainerStyle={styles.content}>
              {filteredResults.map((m) => (
                <Movie
                  type={selectedType}
                  id={m.id}
                  key={m.id}
                  image={m.poster_path}
                />
              ))}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 3,
  },
  keyboardView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    height: 50,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  genresContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  genre: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedGenre: {
    backgroundColor: '#4DB6AC',
  },
  genreText: {
    fontSize: 14,
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
  },
  typeButton: {
    width: '50%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    alignItems: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#78B3CE',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
});

export default Search;