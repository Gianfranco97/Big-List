import React, { useMemo, useState, createContext } from 'react';

const AuthenticatedContext = createContext({
  isAuthenticated: false,
  changeAuthenticatedStatus: () => {},
});

export function AuthenticatedProvider(props) {
  const [isAuthenticated, changeAuthenticatedStatus] = useState(
    !!sessionStorage.getItem('session-token'),
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      changeAuthenticatedStatus,
    }),
    [isAuthenticated],
  );

  return <AuthenticatedContext.Provider value={value} {...props} />;
}

export default AuthenticatedContext;
