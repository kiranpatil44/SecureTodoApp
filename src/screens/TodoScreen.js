import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import { todoReducer, initialState } from '../reducers/todoReducer';

/**
 * Main Todo Screen Component
 * Manages todo list state and handles authentication for CRUD operations
 */
export default function TodoScreen() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /**
   * Handles biometric/device authentication
   * @returns {Promise<boolean>} - Authentication result
   */
  const authenticateUser = async () => {
    try {
      setIsAuthenticating(true);

      // Check if device supports biometric authentication
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert(
          'Error',
          'Biometric authentication not supported on this device',
        );
        return false;
      }

      // Check if biometric records are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          'Error',
          'No biometric records found. Please set up biometric authentication in device settings.',
        );
        return false;
      }

      // Perform authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to modify your todos',
        fallbackLabel: 'Use device passcode',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Higher-order function that wraps actions requiring authentication
   * @param {Function} action - The action to perform after authentication
   * @returns {Function} - Wrapped function with authentication
   */
  const withAuthentication =
    action =>
    async (...args) => {
      if (isAuthenticating) {
        return;
      }

      const isAuthenticated = await authenticateUser();
      if (isAuthenticated) {
        action(...args);
      } else {
        Alert.alert(
          'Authentication Failed',
          'You must authenticate to perform this action.',
        );
      }
    };

  /**
   * Add a new todo item
   * @param {string} text - Todo text content
   */
  const addTodo = text => {
    if (text.trim()) {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      });
    }
  };

  /**
   * Toggle todo completion status
   * @param {string} id - Todo item ID
   */
  const toggleTodo = id => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id,
    });
  };

  /**
   * Update todo text content
   * @param {string} id - Todo item ID
   * @param {string} newText - New text content
   */
  const updateTodo = (id, newText) => {
    if (newText.trim()) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { id, text: newText.trim() },
      });
    }
  };

  /**
   * Delete a todo item
   * @param {string} id - Todo item ID
   */
  const deleteTodo = id => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Secure Todo List</Text>
        <Text style={styles.subtitle}>
          {todos.length} task{todos.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <TodoInput
        onAddTodo={withAuthentication(addTodo)}
        isLoading={isAuthenticating}
      />

      <ScrollView style={styles.todoList} showsVerticalScrollIndicator={false}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onUpdate={withAuthentication(updateTodo)}
            onDelete={withAuthentication(deleteTodo)}
            isLoading={isAuthenticating}
          />
        ))}
        {todos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No todos yet!</Text>
            <Text style={styles.emptySubtext}>Add your first task above</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  todoList: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#adb5bd',
  },
});
