import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Credit({cast}) {
  return (
      <View key={cast.id} style={styles.castItem}>
          <Image
              style={styles.castImage}
              source={{
                  uri: `https://image.tmdb.org/t/p/w185${cast.profile_path}`
              }}
          />
          <Text style={styles.castName}>{cast.name}</Text>
          <Text style={styles.character}>{cast.character}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    castItem: {
        width: 90,
        height: 200,
        marginHorizontal: 4,
        borderRadius: 10,
    },
    castImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    castName: {
        fontSize: 12,
        textAlign: 'center',
    },
    character: {
        fontSize: 10,
        textAlign: 'center',
        color: 'gray',
    },
})
