import reducer, { signIn, signOut } from '../src/redux/reducer/authSlice';

test('signs in and signs out a user', () => {
  const signedIn = reducer(undefined, signIn('demo@example.com'));

  expect(signedIn).toEqual({
    email: 'demo@example.com',
    isAuthenticated: true,
  });
  expect(reducer(signedIn, signOut())).toEqual({
    email: null,
    isAuthenticated: false,
  });
});