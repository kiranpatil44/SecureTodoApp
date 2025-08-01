import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * Todo Header Component
 * Displays app title, statistics, and authentication status
 */
export default function TodoHeader({
  totalTodos,
  completedTodos,
  pendingTodos,
  onClearCompleted,
  isLoading,
  authCapability,
  onLogout,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>My Todo List</Text>
            <Text style={styles.subtitle}>Keep track of your tasks</Text>
          </View>
          {authCapability?.isReady && (
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={onLogout}
            >
              <Text style={styles.logoutText}>🔒</Text>
            </TouchableOpacity>
          )}
        </View>
        {authCapability && (
          <View style={styles.authStatus}>
            <View style={[
              styles.authBadge,
              authCapability.isReady ? styles.authSecure : styles.authUnsecure
            ]}>
              <Text style={[
                styles.authText,
                authCapability.isReady ? styles.authSecureText : styles.authUnsecureText
              ]}>
                {authCapability.isReady ? '🔒 Secured' : '🔓 Unsecured'}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalTodos}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.pendingNumber]}>{pendingTodos}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.completedNumber]}>{completedTodos}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

      {completedTodos > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, isLoading && styles.clearButtonDisabled]}
          onPress={onClearCompleted}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.clearButtonText}>
              Clear {completedTodos} Completed
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  titleSection: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  logoutText: {
    fontSize: 16,
  },
  authStatus: {
    marginTop: 8,
  },
  authBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  authSecure: {
    backgroundColor: '#d4edda',
  },
  authUnsecure: {
    backgroundColor: '#fff3cd',
  },
  authText: {
    fontSize: 12,
    fontWeight: '600',
  },
  authSecureText: {
    color: '#155724',
  },
  authUnsecureText: {
    color: '#856404',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  pendingNumber: {
    color: '#ffc107',
  },
  completedNumber: {
    color: '#28a745',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonDisabled: {
    opacity: 0.6,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
