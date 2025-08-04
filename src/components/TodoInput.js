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
        style={[styles.input, text.trim() && styles.inputFocused]}
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor="#7f8c8d"
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
        activeOpacity={0.8}
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ecf0f1',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'System',
    backgroundColor: '#ffffff',
    marginRight: 16,
    color: '#2c3e50',
    letterSpacing: 0.1,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: '#e5258c',
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#e5258c',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 88,
    shadowColor: '#e5258c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonDisabled: {
    backgroundColor: '#dee2e6',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
});
