/**
 * Todo Reducer - Manages todo list state
 * Implements clean and robust state management using useReducer pattern
 */

export const initialState = [];

/**
 * Todo reducer function
 * @param {Array} state - Current todo list state
 * @param {Object} action - Action object with type and payload
 * @returns {Array} - New state
 */
export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Add new todo to the beginning of the list
      return [action.payload, ...state];

    case 'TOGGLE_TODO':
      // Toggle completion status of specified todo
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'UPDATE_TODO':
      // Update text content of specified todo
      return state.map(todo =>
        todo.id === action.payload.id
          ? {...todo, text: action.payload.text}
          : todo,
      );

    case 'DELETE_TODO':
      // Remove specified todo from list
      return state.filter(todo => todo.id !== action.payload);

    case 'CLEAR_COMPLETED':
      // Remove all completed todos
      return state.filter(todo => !todo.completed);

    default:
      // Return current state for unknown actions
      return state;
  }
};
