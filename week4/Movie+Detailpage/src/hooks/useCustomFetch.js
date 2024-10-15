import { useEffect, useState } from "react";
import axiosInstance from '../apis/axios-instance';

const useCustomFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
              console.log('Fetching data from:', url);
                const response = await axiosInstance.get(url);
                console.log('API Response:', response.data);
                setData(response.data); 
            } catch (error) {
                setIsError(true);
                console.error('Error fetching data:', error); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, isError };
};

export default useCustomFetch;
