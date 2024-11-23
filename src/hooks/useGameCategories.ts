import axiosInstance from '@/lib/axiosInstance';
import { useState, useEffect } from 'react';

const useGameCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<{ loading: boolean; error: string | null }>({
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/game-categories');
        setCategories(response.data);
      } catch (err) {
        setStatus({ loading: false, error: err instanceof Error ? err.message : 'An unknown error occurred' });
      } finally {
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading: status.loading, error: status.error };
};

export default useGameCategories;