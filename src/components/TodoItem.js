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
 * Displays and manages individual todo items (NO AUTHENTICATION REQUIRED)
 */
export default function TodoItem({ todo, onToggle, onUpdate, onDelete, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  /**
   * Handle edit mode toggle
   */
  const handleEdit = () => {
    if (isLoading) return;
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
    if (isLoading) return;
    
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(todo.id),
        },
      ]
    );
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}
        onPress={() => onToggle(todo.id)}
        disabled={isLoading || isEditing}
        activeOpacity={0.7}
      >
        {todo.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

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
            maxLength={200}
          />
        ) : (
          <>
            <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]}>
              {todo.text}
            </Text>
            <Text style={styles.dateText}>
              Created: {formatDate(todo.createdAt)}
              {todo.updatedAt !== todo.createdAt && (
                <Text> • Updated: {formatDate(todo.updatedAt)}</Text>
              )}
            </Text>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={[styles.editButton, isLoading && styles.buttonDisabled]} 
              onPress={handleEdit}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.deleteButton, isLoading && styles.buttonDisabled]} 
              onPress={handleDelete}
              disabled={isLoading}
              activeOpacity={0.7}
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
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dee2e6',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  todoText: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    marginBottom: 4,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  dateText: {
    fontSize: 12,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
  editInput: {
    fontSize: 16,
    color: '#212529',
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 4,
    padding: 8,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'column',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
