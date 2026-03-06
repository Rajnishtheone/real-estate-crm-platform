"use client";

import { useParams } from 'next/navigation';
import { useCreateLead } from '../../../hooks/useCreateLead';
import { useProperty } from '../../../hooks/useProperty';
import { useState } from 'react';
import { PropertySkeletonGrid } from '../../../components/Skeletons';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: property, isLoading } = useProperty(id);
  const leadMutation = useCreateLead();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  if (isLoading) return <div className="p-6"><PropertySkeletonGrid count={1} /></div>;
  if (!property) return <p className="p-6">Not found</p>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await leadMutation.mutateAsync({ ...form, propertyId: id });
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
      <section className="md:col-span-2 space-y-4">
        <img src={property.images?.[0]?.url || 'https://placehold.co/800x400'} className="rounded-xl w-full" alt={property.title} />
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-slate-600">{property.locationCity}, {property.locationCountry}</p>
          <p className="text-2xl font-semibold mt-2">${Number(property.price).toLocaleString()}</p>
        </div>
        <p className="text-slate-700 whitespace-pre-line">{property.description}</p>
      </section>
      <aside className="bg-white shadow-sm rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-semibold">Schedule a call</h3>
        <form className="space-y-3" onSubmit={submit}>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e)=>setForm(f=>({...f, phone:e.target.value}))} />
          <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Message" value={form.message} onChange={(e)=>setForm(f=>({...f, message:e.target.value}))}></textarea>
          <button className="w-full bg-primary text-white rounded-lg py-2 font-semibold" type="submit">Submit Lead</button>
          {leadMutation.isSuccess && <p className="text-green-600 text-sm">Thanks! We will contact you.</p>}
        </form>
      </aside>
    </main>
  );
}
