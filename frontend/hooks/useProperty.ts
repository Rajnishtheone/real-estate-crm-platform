"use client";

import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useProperty = (id?: string) => {
  return useQuery({
    queryKey: ['property', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await api.get(`/properties/${id}`);
      return res.data.data;
    }
  });
};
