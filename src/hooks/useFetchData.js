import { useEffect, useState } from 'react';

const useFetchData = (url, initialParams) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}?page=${params.currentPage}&limit=${params.limit}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result.results);
        setError(null);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, params]);

  return { data, isLoading, error, setParams };
};

export default useFetchData;
