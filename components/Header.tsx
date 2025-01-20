import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Header({title}:{title: string}) {
  return (
    <View style={styles.container}>
      <Ionicons name='menu' size={30} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <View style={{position: 'relative'}}>
        <Ionicons name='notifications-outline' size={30} />
        <Text style={styles.notifications}></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    notifications: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 50,
        top: 0,
        right: 3,
        backgroundColor: "red",
    }
})