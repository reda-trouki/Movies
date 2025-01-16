import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Movie({image}:{image: string}) {
  return (
      <View style={styles.container}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }} style={styles.movieImage} />
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: 105,
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        marginBottom:10,
        overflow: 'hidden'
    },
    movieImage: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        overflow: 'hidden',
        resizeMode: 'cover'
    },
})