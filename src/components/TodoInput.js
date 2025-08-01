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
 * Handles user input for creating new todo items (NO AUTHENTICATION)
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

  const isValid = text.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !isValid && text.length > 0 && styles.inputInvalid]}
          value={text}
          onChangeText={setText}
          placeholder="What needs to be done?"
          placeholderTextColor="#adb5bd"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          editable={!isLoading}
          multiline={false}
          maxLength={200}
        />
        
        <TouchableOpacity 
          style={[
            styles.addButton, 
            (!isValid || isLoading) && styles.addButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isValid || isLoading}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.addButtonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {text.length > 0 && (
        <Text style={styles.charCounter}>
          {text.length}/200 characters
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
    color: '#212529',
  },
  inputInvalid: {
    borderColor: '#dc3545',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 14,
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
  charCounter: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
    marginTop: 4,
  },
});
