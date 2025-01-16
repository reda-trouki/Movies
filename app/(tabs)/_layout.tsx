import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { Stack, Tabs } from 'expo-router'
import React from 'react'

function TabLayout() {
  return (
    <Tabs
        screenOptions={{
          headerShown: false,
        tabBarActiveTintColor: '#4B70F5',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ title: "Home", tabBarIcon: ({ color }) => <Ionicons name='home' size={28} color={color} />}}
      />
      <Tabs.Screen
        name='movies'
        options={{ title: "Movies", tabBarIcon: ({ color }) => <Ionicons name='film' size={28} color={color} />}}
      />
      <Tabs.Screen
        name='tvShows'
        options={{ title: "TV Shows", tabBarIcon: ({ color }) => <Ionicons name='tv' size={28} color={color} />}}
      />
      <Tabs.Screen
        name='search'
        options={{ title: "Search", tabBarIcon: ({ color }) => <Ionicons name='search' size={28} color={color} />}}
      />
    </Tabs>
  )
}

export default TabLayout
