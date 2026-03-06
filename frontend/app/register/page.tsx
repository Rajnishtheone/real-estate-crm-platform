"use client";

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '../services/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => register({ ...form, role: 'BUYER' }),
    onSuccess: () => router.push('/login'),
  });

  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Create account</h1>
      <p className="text-slate-600 mb-6">Join the marketplace.</p>
      <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); mutation.mutate();}}>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Full name" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f, password:e.target.value}))} required />
        <button className="w-full bg-primary text-white rounded-lg py-2 font-semibold" type="submit" disabled={mutation.isLoading}>Register</button>
        {mutation.isError && <p className="text-red-600 text-sm">Registration failed</p>}
      </form>
    </main>
  );
}
