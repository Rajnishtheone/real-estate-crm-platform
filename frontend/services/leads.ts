import api from './api';

export const fetchLeads = async () => {
  const res = await api.get('/leads');
  return res.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const res = await api.patch(`/leads/${id}/status`, { status });
  return res.data;
};
