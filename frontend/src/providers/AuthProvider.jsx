import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getUserByEmail } from '../store/slices/user/thunk';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('loggedInUser'));
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.sub);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('loggedInUser', token);
    const decodedToken = jwtDecode(token);
    setToken(token);
    dispatch(getUserByEmail({ email: decodedToken.sub }));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
