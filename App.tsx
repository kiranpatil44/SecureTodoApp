import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import TodoScreen from './src/screens/TodoScreen';

/**
 * Main App component - Entry point of the application
 * Provides safe area view and status bar configuration
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <TodoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
