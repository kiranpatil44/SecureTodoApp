import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import TodoScreen from './src/screens/TodoScreen';
import AuthScreen from './src/screens/AuthScreen';

/**
 * Main App Content Component
 * Handles authentication flow
 */
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      {isAuthenticated ? <TodoScreen /> : <AuthScreen />}
    </SafeAreaView>
  );
}

/**
 * Main App component for bare React Native project
 * Todo app with biometric authentication using Expo Local Authentication
 */
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
