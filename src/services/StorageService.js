import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage service for persisting todo data
 * Uses AsyncStorage for local data persistence
 */
class StorageService {
  constructor() {
    this.STORAGE_KEY = '@simple_todos';
  }

  /**
   * Save todos to AsyncStorage
   */
  async saveTodos(todos) {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(this.STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }

  /**
   * Load todos from AsyncStorage
   */
  async loadTodos() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  }

  /**
   * Clear all stored todos
   */
  async clearTodos() {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  }
}

export default new StorageService();
