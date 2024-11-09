import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL, 
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, 
  },
  timeout: 10000, 
});

// refreshAccessToken 함수 정의
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post('/auth/token/access', null, {
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
    window.location.href = '/login';  // 로그인 페이지로 리다이렉트
    return null;
  }
};

// Axios request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor
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
        window.location.href = '/login';  // 리다이렉트
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;  // default export로 변경



