import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL, 
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, 
    },
    timeout: 10000, // 요청 제한 시간 설정 (10초)
});

export default axiosInstance;


