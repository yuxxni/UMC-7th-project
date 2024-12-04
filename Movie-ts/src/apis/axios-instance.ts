import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL, // 환경 변수에서 URL 가져오기
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 기본 토큰 설정
  },
  timeout: 10000, // 타임아웃 설정 (10초)
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {  // InternalAxiosRequestConfig으로 타입 지정
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_MOVIE_API_URL}/auth/token/access`, // baseURL을 사용하여 URL 구성
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken); // 새로운 accessToken 저장
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // 요청에 새 토큰 추가
          return axiosInstance(originalRequest); // 새로운 토큰으로 요청 다시 시도
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


