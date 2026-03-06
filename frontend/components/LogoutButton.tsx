"use client";

import { useMutation } from '@tanstack/react-query';
import { logout as apiLogout } from '../services/auth';
import { useAuth } from '../store/auth';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const { refreshToken, logout } = useAuth();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => apiLogout(refreshToken || null),
    onSettled: () => {
      logout();
      router.push('/login');
    },
  });
  return (
    <button className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700" onClick={() => mutation.mutate()}>
      Logout
    </button>
  );
};
