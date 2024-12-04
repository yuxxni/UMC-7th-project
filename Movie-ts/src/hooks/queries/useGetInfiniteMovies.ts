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

interface UseGetInfiniteMoviesParams {
  category: string;
  pageParam?: number;
}

const useGetInfiniteMovies = async ({ category, pageParam = 1 }: UseGetInfiniteMoviesParams): Promise<MovieResponse> => {
  try {
    const { data } = await axiosInstance.get<MovieResponse>(`/movie/${category}?language=ko-KR&page=${pageParam}`);
    console.log('영화 받아오는 중...');
    return data;
  } catch (error) {
    console.error('영화 데이터를 가져오는 중 오류 발생:', error);
    throw error;  
  }
}

export { useGetInfiniteMovies };










/* import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovies";

function useGetInfiniteMovies(category) {
   return useInfiniteQuery({
       queryKey: ['movies', category],
       queryFn: ({ pageParam = 1 }) => useGetMovies({ category, pageParam }),
       getNextPageParam: (lastPage, allPages) => {
           const lastMovie = lastPage.results?.at(-1);
           return lastMovie ? allPages.length + 1 : undefined;
       }
   });
}

export { useGetInfiniteMovies }; */