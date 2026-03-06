"use client";

import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

export const useCreateLead = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post('/leads', payload);
      return res.data;
    },
  });
};
