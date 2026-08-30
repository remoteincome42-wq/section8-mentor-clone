import React, { createContext, useContext, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated] = useState(true);
  const value = {
    isAuthenticated,
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    authChecked: true,
    checkUserAuth: () => {},
    navigateToLogin: () => {}
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
