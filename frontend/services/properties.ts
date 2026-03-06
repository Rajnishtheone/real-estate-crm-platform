import api from './api';

export const fetchProperties = async (params: Record<string, any>) => {
  const res = await api.get('/properties', { params });
  return res.data;
};

export const createProperty = async (payload: any, images: File[]) => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value));
  });
  images.slice(0, 5).forEach((file) => form.append('images', file));
  const res = await api.post('/properties', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data;
};

export const updatePropertyStatus = async (id: string, status: string) => {
  const res = await api.patch(`/properties/${id}/status`, { status });
  return res.data;
};
