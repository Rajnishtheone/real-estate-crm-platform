"use client";

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/auth';
import { useAuth } from '../../store/auth';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const setAuth = useAuth((s) => s.setAuth);
  const router = useRouter();
  const search = useSearchParams();
  const mutation = useMutation({
    mutationFn: () => login(form.email, form.password),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      const next = search?.get('next') || '/dashboard/agent';
      router.push(next);
    },
  });

  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Login</h1>
      <p className="text-slate-600 mb-6">Access your dashboard.</p>
      <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); mutation.mutate();}}>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f, password:e.target.value}))} required />
        <button className="w-full bg-primary text-white rounded-lg py-2 font-semibold" type="submit" disabled={mutation.isLoading}>Login</button>
        {mutation.isError && <p className="text-red-600 text-sm">Login failed</p>}
      </form>
    </main>
  );
}
