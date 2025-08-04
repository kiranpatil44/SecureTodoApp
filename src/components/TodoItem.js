import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

/**
 * Individual Todo Item Component
 * Displays and manages individual todo items with edit/delete functionality
 */
export default function TodoItem({ todo, onUpdate, onDelete, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  /**
   * Handle edit mode toggle
   */
  const handleEdit = () => {
    if (isLoading) {
      return;
    }
    setIsEditing(true);
    setEditText(todo.text);
  };

  /**
   * Save edited todo
   */
  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText);
      setIsEditing(false);
    } else {
      Alert.alert('Invalid Input', 'Todo text cannot be empty');
    }
  };

  /**
   * Cancel editing
   */
  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  /**
   * Handle delete with confirmation
   */
  const handleDelete = () => {
    if (isLoading) {
      return;
    }

    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(todo.id),
      },
    ]);
  };

  return (
    <View style={[styles.container, isLoading && styles.containerLoading]}>
      {/* Todo Content */}
      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={handleSave}
            autoFocus
            multiline
            placeholder="Enter todo text..."
            placeholderTextColor="#7f8c8d"
          />
        ) : (
          <Text
            style={[
              styles.todoText,
              todo.completed && styles.todoTextCompleted,
            ]}
          >
            {todo.text}
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={handleEdit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    shadowColor: '#2c3e50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  containerLoading: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  todoText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2c3e50',
    fontFamily: 'System',
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
    fontWeight: '300',
  },
  editInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2c3e50',
    fontFamily: 'System',
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    backgroundColor: '#ffffff',
    letterSpacing: 0.1,
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  editButton: {
    backgroundColor: '#e5258c',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  deleteButton: {
    backgroundColor: '#000000',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  saveButton: {
    backgroundColor: '#e5258c',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
});
