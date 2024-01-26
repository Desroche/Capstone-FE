import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userRole, setRole] = useState(localStorage.getItem("userRole"));

  const setToken = (newToken) => {
    setToken_(newToken);
    localStorage.setItem('token', newToken);
  };

  const setUserRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  // Clear token state, role local storage, and reset axios auth header
  const logout = () => {
    setToken_(null); 
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization']; 
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setUserRole,
      setToken,
      userRole,
      logout,
    }),
    [token, userRole]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
