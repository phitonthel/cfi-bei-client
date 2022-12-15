import { useState, useEffect } from 'react';
import axios from 'axios';

import { config } from '../env';

export const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }

    return () => {
      source.cancel();
    }
  }, [path])

  return { 
    data,
    setData,
    loading,
    setLoading, 
    error,
    setError,
  }
}