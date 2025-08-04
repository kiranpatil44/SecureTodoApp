import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * Todo Input Component
 * Handles user input for creating new todo items
 */
export default function TodoInput({ onAddTodo, isLoading }) {
  const [text, setText] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor="#adb5bd"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        editable={!isLoading}
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          (!text.trim() || isLoading) && styles.addButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!text.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.addButtonText}>Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  addButtonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
