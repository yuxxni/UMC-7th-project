import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// AuthContext의 값 타입 정의
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false; 

    try {
      const response = await axios.post('/auth/token/access', { refreshToken });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout(); // 토큰 갱신 실패하면 로그아웃 처리
      return false;
    }
  };

 
  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const valid = await refreshAccessToken();
        setIsAuthenticated(valid);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  // 로그인 처리
  const login = (token: string, refreshToken: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken); 
    setIsAuthenticated(true);
  };

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
