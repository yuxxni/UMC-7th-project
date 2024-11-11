import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../apis/axios-instance';


const fetchData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data; 
};

const useCustomFetch = (url) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [url],  // queryKey를 URL로 설정
    queryFn: () => fetchData(url),
    retry: 2, 
  });

  return { data, isLoading, isError };
};

export default useCustomFetch;
