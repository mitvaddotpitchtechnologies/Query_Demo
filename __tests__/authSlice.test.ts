import reducer, { signIn, signOut } from '../src/redux/reducer/authSlice';

test('signs in and signs out a user', () => {  //User sign in અને sign out કરે ત્યારે Redux state  બદલાય છે કે નહીં.
  const signedIn = reducer(undefined, signIn('demo@example.com'));  

  expect(signedIn).toEqual({  
    email: 'demo@example.com',
    isAuthenticated: true,
  });
  expect(reducer(signedIn, signOut())).toEqual({ // 
    email: null, 
    isAuthenticated: false,
  });
});