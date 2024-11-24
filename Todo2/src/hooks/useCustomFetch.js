// hooks/useCustomFetch.js
import { useState, useEffect } from 'react';
import axiosInstance from '../apis/axios-instance'; // axios 인스턴스를 임포트

const useCustomFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url); 
        setData(response.data); 
      } catch (err) {
        setError(err); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [url]); 

  return { data, isLoading, error }; 
};

export default useCustomFetch;








