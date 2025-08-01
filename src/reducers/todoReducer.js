/**
 * Todo Reducer for clean state management
 * Implements all CRUD operations for todo items
 */

export const initialState = [];

/**
 * Action types for todo operations
 */
export const TODO_ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
};

/**
 * Todo reducer function - manages all todo state changes
 */
export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_TODOS:
      return action.payload;

    case TODO_ACTIONS.ADD_TODO:
      return [action.payload, ...state];

    case TODO_ACTIONS.UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, updatedAt: new Date().toISOString() }
          : todo
      );

    case TODO_ACTIONS.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      );

    case TODO_ACTIONS.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

/**
 * Action creators for todo operations
 */
export const todoActions = {
  setTodos: (todos) => ({
    type: TODO_ACTIONS.SET_TODOS,
    payload: todos,
  }),

  addTodo: (text) => ({
    type: TODO_ACTIONS.ADD_TODO,
    payload: {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }),

  updateTodo: (id, text) => ({
    type: TODO_ACTIONS.UPDATE_TODO,
    payload: { id, text: text.trim() },
  }),

  toggleTodo: (id) => ({
    type: TODO_ACTIONS.TOGGLE_TODO,
    payload: id,
  }),

  deleteTodo: (id) => ({
    type: TODO_ACTIONS.DELETE_TODO,
    payload: id,
  }),

  clearCompleted: () => ({
    type: TODO_ACTIONS.CLEAR_COMPLETED,
  }),
};
