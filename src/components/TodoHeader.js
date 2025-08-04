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
 */
export default function TodoHeader({
  totalTodos,
  completedTodos,
  pendingTodos,
  onClearCompleted,
  isLoading,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.subtitle}>Keep track of your tasks</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalTodos}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.pendingNumber]}>
            {pendingTodos}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.completedNumber]}>
            {completedTodos}
          </Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

      {completedTodos > 0 && (
        <TouchableOpacity
          style={[styles.clearButton, isLoading && styles.clearButtonDisabled]}
          onPress={onClearCompleted}
          disabled={isLoading}
          activeOpacity={0.8}
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
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  titleSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50',
    fontFamily: 'System',
    marginBottom: 6,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '400',
    fontFamily: 'System',
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    fontFamily: 'System',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  pendingNumber: {
    color: '#e5258c', // Paidy's signature pink for pending items
  },
  completedNumber: {
    color: '#27ae60', // Green for completed items
  },
  statLabel: {
    fontSize: 13,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.8,
  },
  clearButton: {
    backgroundColor: '#000000', // Paidy's black for secondary actions
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonDisabled: {
    opacity: 0.6,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
});
