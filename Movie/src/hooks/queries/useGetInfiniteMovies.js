// src/hooks/queries/useGetInfiniteMovies.js
import axiosInstance from "../../apis/axios-instance";

const useGetInfiniteMovies = async ({ category, pageParam = 1 }) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`);
    console.log('영화 받아오는 중...');
    return data;
  } catch (error) {
    console.error('영화 데이터를 가져오는 중 오류 발생:', error);
    throw error;  // 오류 발생 시 에러를 던집니다.
  }
}

export { useGetInfiniteMovies };  // 제대로 export되었는지 확인









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