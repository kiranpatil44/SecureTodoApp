import React, { useReducer, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import TodoHeader from '../components/TodoHeader';
import { todoReducer, initialState, todoActions } from '../reducers/todoReducer';
import StorageService from '../services/StorageService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Main Todo Screen Component
 * Manages todo list state and persistence with biometric authentication
 */
export default function TodoScreen() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { authenticate, authCapability, logout } = useAuth();

  /**
   * Load todos from storage on app start
   */
  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Save todos to storage whenever state changes
   */
  useEffect(() => {
    if (!isInitializing) {
      StorageService.saveTodos(todos);
    }
  }, [todos, isInitializing]);

  /**
   * Load initial data from storage
   */
  const loadInitialData = async () => {
    try {
      setIsInitializing(true);
      const savedTodos = await StorageService.loadTodos();
      dispatch(todoActions.setTodos(savedTodos));
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'Failed to load saved todos.');
    } finally {
      setIsInitializing(false);
    }
  };

  /**
   * Add a new todo item
   */
  const addTodo = useCallback((text) => {
    if (text && text.trim()) {
      dispatch(todoActions.addTodo(text));
    }
  }, []);

  /**
   * Update existing todo text
   */
  const updateTodo = useCallback((id, text) => {
    if (text && text.trim()) {
      dispatch(todoActions.updateTodo(id, text));
    }
  }, []);

  /**
   * Toggle todo completion status
   */
  const toggleTodo = useCallback((id) => {
    dispatch(todoActions.toggleTodo(id));
  }, []);

  /**
   * Delete a todo item (requires authentication)
   */
  const deleteTodo = useCallback(async (id) => {
    if (authCapability?.isReady) {
      const authenticated = await authenticate('Authenticate to delete this task');
      if (!authenticated) {
        return;
      }
    }
    dispatch(todoActions.deleteTodo(id));
  }, [authenticate, authCapability]);

  /**
   * Clear all completed todos (requires authentication)
   */
  const clearCompleted = useCallback(async () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
      Alert.alert('No Completed Tasks', 'There are no completed tasks to clear.');
      return;
    }

    // Require authentication for bulk deletion
    if (authCapability?.isReady) {
      const authenticated = await authenticate('Authenticate to clear completed tasks');
      if (!authenticated) {
        return;
      }
    }

    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to delete ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(todoActions.clearCompleted()),
        },
      ]
    );
  }, [todos, authenticate, authCapability]);

  /**
   * Refresh todos from storage
   */
  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await loadInitialData();
    setIsLoading(false);
  }, []);

  // Calculate todo statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  if (isInitializing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading your todos...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TodoHeader
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        pendingTodos={pendingTodos}
        onClearCompleted={clearCompleted}
        isLoading={isLoading}
        authCapability={authCapability}
        onLogout={logout}
      />

      <TodoInput 
        onAddTodo={addTodo} 
        isLoading={isLoading}
      />

      <ScrollView 
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#007bff']}
            tintColor="#007bff"
          />
        }
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            isLoading={isLoading}
          />
        ))}
        
        {todos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No todos yet! 📝</Text>
            <Text style={styles.emptySubtitle}>
              Add your first task above
            </Text>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: '500',
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
});
