import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';




const fetchData = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

const useCustomFetch = <T>(url: string, options?: UseQueryOptions<T, Error>): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: [url],
    queryFn: () => fetchData<T>(url),
    ...options, 
  });
};

export default useCustomFetch;
