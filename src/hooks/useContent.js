// hooks/useContent.js
import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useContent = (filters = {}) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0
  });

  const fetchContent = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await api.get('/content', {
        params: {
          ...filters,
          page,
          limit: 12
        }
      });
      setContent(data.contents);
      setPagination({
        page: data.page,
        totalPages: data.pages,
        totalItems: data.total
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [JSON.stringify(filters)]);

  return {
    content,
    loading,
    error,
    pagination,
    fetchContent
  };
};