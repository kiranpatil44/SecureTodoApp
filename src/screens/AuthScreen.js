import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

/**
 * Authentication Screen
 * Handles user authentication using biometric or device credentials
 */
export default function AuthScreen() {
  const { 
    isAuthenticated, 
    authCapability, 
    isLoading, 
    authenticate 
  } = useAuth();

  useEffect(() => {
    // Auto-authenticate if capability is already checked and ready
    if (!isLoading && authCapability?.isReady && !isAuthenticated) {
      handleAuthenticate();
    }
  }, [isLoading, authCapability, isAuthenticated]);

  const handleAuthenticate = async () => {
    await authenticate('Please authenticate to access your secure todos');
  };

  const getAuthStatusMessage = () => {
    if (isLoading) {
      return 'Checking authentication capabilities...';
    }

    if (!authCapability) {
      return 'Unable to check authentication capabilities';
    }

    if (!authCapability.hasHardware) {
      return 'No biometric hardware detected. Access granted automatically.';
    }

    if (!authCapability.isEnrolled) {
      return 'No biometric authentication set up. Please configure Face ID, Touch ID, or Fingerprint in your device settings.';
    }

    return `Authentication available: ${authCapability.typeNames.join(', ')}`;
  };

  const getAuthButtonText = () => {
    if (!authCapability?.isReady) {
      return 'Continue';
    }
    return `Authenticate with ${authCapability.typeNames[0] || 'Device'}`;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Initializing Security...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Secure Todo App</Text>
          <Text style={styles.subtitle}>Your tasks, protected by biometric security</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            authCapability?.isReady ? styles.statusReady : styles.statusNotReady
          ]}>
            <Text style={[
              styles.statusText,
              authCapability?.isReady ? styles.statusReadyText : styles.statusNotReadyText
            ]}>
              {authCapability?.isReady ? '🔒 Secure' : '🔓 Unsecured'}
            </Text>
          </View>
          <Text style={styles.statusMessage}>
            {getAuthStatusMessage()}
          </Text>
        </View>

        {authCapability?.typeNames && authCapability.typeNames.length > 0 && (
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Available Authentication:</Text>
            {authCapability.typeNames.map((type, index) => (
              <Text key={index} style={styles.featureItem}>
                • {type}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.authButton,
            !authCapability?.isReady && styles.authButtonDisabled
          ]}
          onPress={handleAuthenticate}
          activeOpacity={0.8}
        >
          <Text style={styles.authButtonText}>
            {getAuthButtonText()}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          {authCapability?.isReady
            ? 'Your todos are protected by device security'
            : 'Authentication unavailable - proceeding without biometric protection'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  statusReady: {
    backgroundColor: '#e8f5e8',
  },
  statusNotReady: {
    backgroundColor: '#fff3cd',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusReadyText: {
    color: '#155724',
  },
  statusNotReadyText: {
    color: '#856404',
  },
  statusMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  featuresContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  authButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  authButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
});