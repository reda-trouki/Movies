import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function Template({ children }:{children:React.ReactNode}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
          colors={['#F8FAFC', '#F8FAFC', 'white', 'white']} // Colors
          locations={[0, 0.4, 0.4, 1]} // Color stops
          start={{ x: 0, y: 0 }} // Start point (left)
          end={{ x: 1, y: 0 }} // End point (right)
          style={styles.container}
      >
      <StatusBar
        barStyle="dark-content"
      />
        {children}
    </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
  },
  container: {
    flex:1,
  }
})