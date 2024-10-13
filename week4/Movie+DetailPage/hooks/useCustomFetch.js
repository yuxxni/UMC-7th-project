import { useEffect, useState } from 'react';
import axiosInstance from '../apis/axios-instance'; 

const useCustomFetch = (url, params = {}, deps = []) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false); 

            try {
                const response = await axiosInstance.get(url, { 
                    params: {
                        ...params,
                        language: 'ko-KR',
                    }
                });
                setData(response.data.results);
            } catch (error) {
                setIsError(true);
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(params), ...deps]); 

    return { data, isLoading, isError };
};

export default useCustomFetch;
