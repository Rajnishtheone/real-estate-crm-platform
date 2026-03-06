"use client";

import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createProperty } from '../../../services/properties';
import { useRouter } from 'next/navigation';

export default function NewPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', locationCity: '', locationCountry: '', price: 0, type: 'APARTMENT', bedrooms: 1, bathrooms: 1
  });
  const [images, setImages] = useState<File[]>([]);
  const previews = useMemo(() => images.map((f) => URL.createObjectURL(f)), [images]);

  const mutation = useMutation({
    mutationFn: () => createProperty({ ...form, price: Number(form.price) }, images),
    onSuccess: (p) => router.push(`/properties/${p.data.id}`),
  });

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size <= 5 * 1024 * 1024).slice(0, 5);
    setImages(valid);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Submit a property</h1>
        <span className="text-sm text-slate-500">Up to 5 images • 5MB each</span>
      </div>
      <form className="grid gap-3" onSubmit={(e)=>{e.preventDefault(); mutation.mutate();}}>
        <input className="border rounded-lg px-3 py-2" placeholder="Title" value={form.title} onChange={(e)=>setForm(f=>({...f, title:e.target.value}))} required />
        <textarea className="border rounded-lg px-3 py-2" placeholder="Description" value={form.description} onChange={(e)=>setForm(f=>({...f, description:e.target.value}))} required />
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="City" value={form.locationCity} onChange={(e)=>setForm(f=>({...f, locationCity:e.target.value}))} required />
          <input className="border rounded-lg px-3 py-2" placeholder="Country" value={form.locationCountry} onChange={(e)=>setForm(f=>({...f, locationCountry:e.target.value}))} required />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e)=>setForm(f=>({...f, price:e.target.value}))} required />
          <select className="border rounded-lg px-3 py-2" value={form.type} onChange={(e)=>setForm(f=>({...f, type:e.target.value}))}>
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="PLOT">Plot</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
          <input className="border rounded-lg px-3 py-2" placeholder="Bedrooms" type="number" value={form.bedrooms} onChange={(e)=>setForm(f=>({...f, bedrooms:Number(e.target.value)}))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Bathrooms" type="number" value={form.bathrooms} onChange={(e)=>setForm(f=>({...f, bathrooms:Number(e.target.value)}))} />
        </div>
        <div className="border rounded-lg p-4 bg-white space-y-3">
          <label className="block font-semibold">Images</label>
          <input type="file" accept="image/*" multiple onChange={onFiles} />
          {previews.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {previews.map((src, idx) => (
                <img key={idx} src={src} alt={`preview-${idx}`} className="h-24 w-full object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <button className="bg-primary text-white rounded-lg py-2 font-semibold" type="submit" disabled={mutation.isLoading}>Create</button>
        {mutation.isError && <p className="text-red-600 text-sm">Error creating property</p>}
      </form>
    </main>
  );
}
