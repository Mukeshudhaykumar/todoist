export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ACCOUNT_INITIALISE = 'ACCOUNT_INITIALISE';

// Action for initializing the account
export const accountInitialise = (isLoggedIn, user) => ({
    type: ACCOUNT_INITIALISE,
    payload: {
      isLoggedIn,
      user
    }
  });
  
  // Action for logging in
  export const login = (user) => ({
    type: LOGIN,
    payload: {
      user
    }
  });
  
  // Action for logging out
  export const logout = () => ({
    type: LOGOUT
  });
  