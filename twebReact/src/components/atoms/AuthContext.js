import { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [checkCredentials, setCheckCredentials] = useState(false);
  const [user, setUser] = useState(null); // fare in modo che se è loggato mostri il nome utente e altre cose devo ritonarle dalla chiamata

  const login = (email, password) => {
    console.log('login function in AuthContext.js');

    const apiUrl = `http://localhost:3001/logIn/check-credentials?email=${email}&password=${password}`;
    axios
      .get(apiUrl, {
        email,
        password,
      })
      .then(
        (response) => {
          console.log(response.data);
          setUser(response.data);
          localStorage.setItem('user', response.data);
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

  const logout = (email, password) => {
    setCheckCredentials(false);
    localStorage.removeItem(user);
  };

  return (
    <AuthContext.Provider
      value={{ checkCredentials, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
