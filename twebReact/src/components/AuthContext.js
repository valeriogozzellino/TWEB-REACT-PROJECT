import { createContext, useState, useContext } from 'react';
import axios from 'axios';

/**
 * AuthContext Component:
 *
 * Provides an authentication context for managing user login, logout, and credentials checking.
 *
 * Behavior:
 * - Manages user authentication state.
 * - Provides functions for logging in, logging out, and checking if a user is logged in.
 *
 * @returns {JSX.Element} The JSX for the AuthContext provider.
 */

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [checkCredentials, setCheckCredentials] = useState(false);
  const [user, setUser] = useState(null); // fare in modo che se è loggato mostri il nome utente e altre cose devo ritonarle dalla chiamata

  const login = (email, password) => {
    const apiUrl = `http://localhost:3001/logIn/check-credentials?email=${email}&password=${password}`;
    axios
      .get(apiUrl, {
        email,
        password,
      })
      .then(
        (response) => {
          setUser(response.data);
          // Save the JSON string in local storage
          const userJSONString = JSON.stringify(response.data);
          localStorage.setItem('user', userJSONString);

          if (response.data === null) {
            alert('Wrong credentials');
          } else {
            setCheckCredentials(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getUser = () => {
    if (localStorage.getItem('user')) {
      setCheckCredentials(true);
      const userJSONString = localStorage.getItem('user');
      const userObject = JSON.parse(userJSONString);
      setUser(userObject);
    }
  };
  const logout = (email, password) => {
    setCheckCredentials(false);
    localStorage.removeItem(user);
  };

  return (
    <AuthContext.Provider
      value={{ checkCredentials, login, logout, user, setUser, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
