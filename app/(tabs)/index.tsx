import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, ImageBackground } from 'react-native';
import Header from '@/components/Header';
import NewShowing from '@/components/New-Showing';
import Popular from '@/components/Popular';
import { LinearGradient } from 'expo-linear-gradient';
import Template from '@/components/template';

export default function Index() {
  return (
    <Template>
      <Header title={'Movie App'}/>
      <ScrollView style={styles.content}>
        <NewShowing />
        <Popular/>
      </ScrollView>
    </Template>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Take up remaining space
  },
});