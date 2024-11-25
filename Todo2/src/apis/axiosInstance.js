import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 서버 URL이 맞는지 확인
  timeout: 10000, // 요청 제한 시간 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 정상일 때 그대로 반환
  (error) => {
    // 응답 에러가 있을 경우 상세히 로깅
    if (error.response) {
      // 서버가 응답은 했지만, 상태 코드가 2xx 범위 밖
      console.error('응답 에러:', error.response);
      console.error('응답 상태 코드:', error.response.status);
      console.error('응답 데이터:', error.response.data);
    } else if (error.request) {
      // 서버에 요청을 보냈지만 응답이 없을 때
      console.error('응답 없음:', error.request);
    } else {
      // 요청 설정 중 에러가 발생했을 때
      console.error('요청 설정 에러:', error.message);
    }
    return Promise.reject(error); // 에러 반환
  }
);

export default axiosInstance;





