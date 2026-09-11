import React from 'react';
import { Button } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screen/authscreen/LoginScreen';

const mockDispatch = jest.fn(); //  

jest.mock('../src/redux/hooks.ts', () => ({ // 
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../src/redux/reducer/authSlice.ts', () => ({
  signIn: jest.fn((email: string) => ({
    type: 'auth/signIn',
    payload: email,
  })),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Login screen render થાય છે કે નહીં
  it('renders login screen correctly', () => {
    const { getByText, getByPlaceholderText } =
      render(<LoginScreen />);

    expect(getByText('Welcome back.')).toBeTruthy();
    expect(
      getByText('Explore cached users with TanStack Query.')
    ).toBeTruthy();

    expect(getByPlaceholderText('Email')).toBeTruthy(); // input હોવું જોઈએ."
    expect(getByPlaceholderText('Password')).toBeTruthy(); 

    expect(getByText('Sign in')).toBeTruthy();
  });

  // 2. Default email check
  it('shows default email', () => {
    const { getByPlaceholderText } =
      render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Email');

    expect(emailInput.props.value).toBe('demo@example.com');
  });

  // 3. Default password check
  it('shows default password', () => {
    const { getByPlaceholderText } =
      render(<LoginScreen />);

    const passwordInput = getByPlaceholderText('Password');

    expect(passwordInput.props.value).toBe('password');
  });

  // 4. Email change test
  it('updates email when user types', () => {
    const { getByPlaceholderText } =
      render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(
      emailInput,
      'test@gmail.com'
    );

    expect(emailInput.props.value).toBe('test@gmail.com');
  });

  // 5. Password change test
  it('updates password when user types', () => {
    const { getByPlaceholderText } =
      render(<LoginScreen />);

    const passwordInput =
      getByPlaceholderText('Password');

    fireEvent.changeText(
      passwordInput,
      '123456'
    );

    expect(passwordInput.props.value).toBe('123456');
  });

  // 6. Sign in button dispatch test
  it('dispatches signIn action with email', () => {
    const { getByPlaceholderText, getByText } =
      render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Email'); 
    const passwordInput =getByPlaceholderText('Password'); // store કરે છે.

    fireEvent.changeText(
      emailInput,
      'test@gmail.com'
    );

    fireEvent.changeText(
      passwordInput,
      '123456'
    );

    fireEvent.press(getByText('Sign in'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/signIn',
      payload: 'test@gmail.com',
    });
  });

  // 7. Email trim test
  it('trims email before dispatch', () => {
    const { getByPlaceholderText, getByText } =
      render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      '  test@gmail.com  '
    );

    fireEvent.changeText(
      getByPlaceholderText('Password'),
      '123456'
    );

    fireEvent.press(getByText('Sign in')); 

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/signIn',
      payload: 'test@gmail.com',
    });
  });

  // 8. Empty email → button disabled
  it('disables sign in button when email is empty', () => {
    const { getByPlaceholderText, UNSAFE_getByType } =
      render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      ''
    );

    const button = UNSAFE_getByType(Button);

    expect(button.props.disabled).toBe(true);
  });

  // 9. Empty password → button disabled
  it('disables sign in button when password is empty', () => {
    const { getByPlaceholderText, UNSAFE_getByType } =
      render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('Password'),
      ''
    );

    const button = UNSAFE_getByType(Button);

    expect(button.props.disabled).toBe(true);
  });

  // 10. Both fields filled → button enabled
  it('enables sign in button when email and password are filled', () => {
    const { UNSAFE_getByType } =
      render(<LoginScreen />);

    const button = UNSAFE_getByType(Button);

    expect(button.props.disabled).toBe(false);
  });
});