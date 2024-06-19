import { useState, useEffect } from 'react';

import axios from 'axios';

import { config } from '../env';

export const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setIsLoading(true)
      setData(null);
      setError(null);

      const source = axios.CancelToken.source();

      const { data } = await axios.get(`${config.baseUrl}${path}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        cancelToken: source.token
      })

      setData(data)
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }

    return () => {
      source.cancel();
    }
  }, [path])

  return { 
    data,
    setData,
    isLoading,
    setIsLoading, 
    error,
    setError,
  }
}