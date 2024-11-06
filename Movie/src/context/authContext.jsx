import { createContext, useContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  });


  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

     
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

     
      setAuthState({
        accessToken,
        refreshToken,
      });

      return response.data; 
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ authState, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
