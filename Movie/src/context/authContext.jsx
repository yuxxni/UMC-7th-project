import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 토큰 유효성 검사 및 자동 갱신
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false; // refreshToken이 없으면 false 리턴

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

  // 컴포넌트 로드 시 토큰 검사 및 갱신
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
  const login = (token, refreshToken) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken); // refreshToken도 함께 저장
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
