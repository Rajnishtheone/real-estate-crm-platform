"use client";

import { useState } from 'react';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/PropertyCard';
import { PropertySkeletonGrid } from '../../components/Skeletons';

export default function PropertiesPage() {
  const [filters, setFilters] = useState({ city: '', type: '', minPrice: '', maxPrice: '', bedrooms: '' });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { data, isLoading } = useProperties({
    city: filters.city || undefined,
    type: filters.type || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
    bedrooms: filters.bedrooms || undefined,
    page,
    limit,
  });

  const items = data?.data || [];
  const pagination = data?.pagination;
  const nextPage = () => {
    if (pagination && page < (pagination.pages || page + 1)) setPage(page + 1);
    else setPage(page + 1);
  };
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-slate-600">Browse and filter active listings.</p>
        </div>
        <div className="grid grid-cols-5 gap-3 bg-white p-3 rounded-xl shadow-sm">
          <input className="border rounded-lg px-3 py-2" placeholder="City" value={filters.city} onChange={(e)=>{setPage(1);setFilters(f=>({...f, city:e.target.value}));}} />
          <select className="border rounded-lg px-3 py-2" value={filters.type} onChange={(e)=>{setPage(1);setFilters(f=>({...f, type:e.target.value}));}}>
            <option value="">Any type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="PLOT">Plot</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
          <input className="border rounded-lg px-3 py-2" placeholder="Min price" type="number" value={filters.minPrice} onChange={(e)=>{setPage(1);setFilters(f=>({...f, minPrice:e.target.value}));}} />
          <input className="border rounded-lg px-3 py-2" placeholder="Max price" type="number" value={filters.maxPrice} onChange={(e)=>{setPage(1);setFilters(f=>({...f, maxPrice:e.target.value}));}} />
          <input className="border rounded-lg px-3 py-2" placeholder="Bedrooms" type="number" value={filters.bedrooms} onChange={(e)=>{setPage(1);setFilters(f=>({...f, bedrooms:e.target.value}));}} />
        </div>
      </div>

      {isLoading ? (
        <PropertySkeletonGrid count={limit} />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((p: any) => (
            <PropertyCard key={p.id} id={p.id} title={p.title} locationCity={p.locationCity} locationCountry={p.locationCountry} price={Number(p.price)} type={p.type} bedrooms={p.bedrooms} bathrooms={p.bathrooms} image={p.images?.[0]?.url} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Page {page}{pagination?.pages ? ` of ${pagination.pages}` : ''}</span>
          <select className="border rounded px-2 py-1" value={limit} onChange={(e)=>{setPage(1); setLimit(Number(e.target.value));}}>
            {[6,9,12,18].map(n=> <option key={n} value={n}>{n}/page</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded bg-slate-100" onClick={prevPage} disabled={page<=1}>Previous</button>
          <button className="px-3 py-2 rounded bg-slate-100" onClick={nextPage} disabled={pagination?.pages ? page >= pagination.pages : false}>Next</button>
        </div>
      </div>
    </main>
  );
}
