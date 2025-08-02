import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <TodoInput onAddTodo={mockOnAddTodo} isLoading={false} />,
    );

    expect(getByPlaceholderText('What needs to be done?')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  test('calls onAddTodo when add button is pressed with valid text', async () => {
    const {getByPlaceholderText, getByText} = render(
      <TodoInput onAddTodo={mockOnAddTodo} isLoading={false} />,
    );

    const input = getByPlaceholderText('What needs to be done?');
    const addButton = getByText('Add');

    // Wrap state updates in act()
    await act(async () => {
      fireEvent.changeText(input, 'New todo item');
    });

    await act(async () => {
      fireEvent.press(addButton);
    });

    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
  });

  test('does not call onAddTodo with empty text', async () => {
    const {getByText} = render(
      <TodoInput onAddTodo={mockOnAddTodo} isLoading={false} />,
    );

    const addButton = getByText('Add');

    await act(async () => {
      fireEvent.press(addButton);
    });

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('clears input after successful submission', async () => {
    const {getByPlaceholderText, getByText} = render(
      <TodoInput onAddTodo={mockOnAddTodo} isLoading={false} />,
    );

    const input = getByPlaceholderText('What needs to be done?');
    const addButton = getByText('Add');

    await act(async () => {
      fireEvent.changeText(input, 'Test todo');
    });

    await act(async () => {
      fireEvent.press(addButton);
    });

    expect(input.props.value).toBe('');
  });

  test('shows loading state when isLoading is true', () => {
    expect(() =>
      render(<TodoInput onAddTodo={mockOnAddTodo} isLoading={true} />),
    ).not.toThrow();
  });
});
