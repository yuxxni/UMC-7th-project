import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL, // API base URL
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 기본 토큰
  },
  timeout: 10000, // 요청 타임아웃 10초
});

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // 저장된 refreshToken 가져오기
    console.log("Refresh Token:", refreshToken); // 확인용 로그
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(' http://localhost:3000/auth/token/access', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`, 
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken); 

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    window.location.href = '/login'; 
    return null;
  }
};


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    console.log("Access Token:", token); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      const newAccessToken = await refreshAccessToken(); 

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; 
        return axiosInstance(originalRequest);
      } else {
        window.location.href = '/login';  
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


