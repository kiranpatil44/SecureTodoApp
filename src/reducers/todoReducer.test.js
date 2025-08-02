import {todoReducer} from '../reducers/todoReducer';

/**
 * Unit tests for todo reducer
 * Tests the core state management logic
 */

describe('todoReducer', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: '2023-01-01T00:00:00.000Z',
  };

  test('should add a new todo', () => {
    const action = {
      type: 'ADD_TODO',
      payload: mockTodo,
    };

    const newState = todoReducer([], action);
    expect(newState).toHaveLength(1);
    expect(newState[0]).toEqual(mockTodo);
  });

  test('should toggle todo completion', () => {
    const initialStateWithTodo = [mockTodo];
    const action = {
      type: 'TOGGLE_TODO',
      payload: '1',
    };

    const newState = todoReducer(initialStateWithTodo, action);
    expect(newState[0].completed).toBe(true);

    // Toggle back
    const newState2 = todoReducer(newState, action);
    expect(newState2[0].completed).toBe(false);
  });

  test('should update todo text', () => {
    const initialStateWithTodo = [mockTodo];
    const action = {
      type: 'UPDATE_TODO',
      payload: {id: '1', text: 'Updated todo text'},
    };

    const newState = todoReducer(initialStateWithTodo, action);
    expect(newState[0].text).toBe('Updated todo text');
  });

  test('should delete todo', () => {
    const initialStateWithTodo = [mockTodo];
    const action = {
      type: 'DELETE_TODO',
      payload: '1',
    };

    const newState = todoReducer(initialStateWithTodo, action);
    expect(newState).toHaveLength(0);
  });

  test('should not modify state for unknown action', () => {
    const initialStateWithTodo = [mockTodo];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 'test',
    };

    const newState = todoReducer(initialStateWithTodo, action);
    expect(newState).toEqual(initialStateWithTodo);
  });
});
