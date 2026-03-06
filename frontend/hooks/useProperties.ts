"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '../services/properties';

export const useProperties = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => fetchProperties(params),
  });
};
