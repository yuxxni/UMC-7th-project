import axiosInstance from "../../apis/axios-instance";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface UseGetMoviesParams {
  category: string;
  pageParam?: number;
}

const useGetMovies = async ({ category, pageParam = 1 }: UseGetMoviesParams): Promise<MovieResponse> => {
  try {
    const { data } = await axiosInstance.get<MovieResponse>(`/movie/${category}?language=ko-KR&page=${pageParam}`);
    console.log('영화 받아오는 중...');
    return data;
  } catch (error) {
    console.error('영화 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}

export { useGetMovies };




/* 
import axiosInstance from "../../apis/axios-instance"; 

const useGetMovies = async ({ category, pageParam }) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
  console.log('영화 받아오는 중...');
  return data;
}

export { useGetMovies }; */
