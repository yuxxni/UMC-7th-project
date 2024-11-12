import { useInfiniteQuery } from "@tanstack/react-query";
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

export { useGetInfiniteMovies };
