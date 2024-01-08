import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkCredentials, setCheckCredentials] = useState(false);

  const login = () => {
    // Aggiungi logicamente l'accesso qui, ad esempio con una chiamata API.
    setCheckCredentials(true);
  };

  const logout = () => {
    // Aggiungi logicamente il logout qui.
    setCheckCredentials(false);
  };

  return (
    <AuthContext.Provider value={{ checkCredentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
