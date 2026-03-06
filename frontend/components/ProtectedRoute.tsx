"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../store/auth';
import { getMe } from '../services/users';

interface Props {
  roles?: string[];
  children: ReactNode;
}

export const ProtectedRoute = ({ roles, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, setAuth, logout } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      if (!user) {
        try {
          const me = await getMe();
          setAuth(me.data, token);
        } catch (err) {
          logout();
          router.replace('/login');
          return;
        }
      }
      if (roles && user && !roles.includes(user.role)) {
        router.replace('/login');
        return;
      }
    };
    hydrate().finally(() => setChecking(false));
  }, [token, user, roles, router, pathname, setAuth, logout]);

  if (checking) return <p className="p-6">Checking access...</p>;
  if (roles && user && !roles.includes(user.role)) return <p className="p-6">Unauthorized</p>;
  return <>{children}</>;
};
