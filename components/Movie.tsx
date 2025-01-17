import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface MovieProps {
  image: string;
  id: number;
  title: string;
}

export default function Movie({ image, id, title }: MovieProps) {
  // Determine the link based on the title
  const link = title === 'tv' ? `/series/${id}` : `/movies/${id}`;

  return (
    <Link
      style={styles.container}
      href={link} // Pass the link directly as a string
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
        style={styles.movieImage}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 150,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});