import axiosInstance from "../../apis/axios-instance"; 

const useGetMovies = async ({ category, pageParam }) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
  console.log('영화 받아오는 중...');
  return data;
}

export { useGetMovies };



